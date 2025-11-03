import J from 'joi';
import type {
  CreateInputType,
  CreateResType,
  FilterInferSchemaType,
  ProjectionType,
  ResType,
} from './@types/model';
import type {
  EnumSchemaType,
  FieldSchemaType,
  NumSchemaType,
  StrSchemaType,
} from './@types/schema';
import type { Prettify } from './@types/utils';
import { compiler } from './compiler/main';
import { ValidetionError } from './error';

const getNumber = (field: NumSchemaType) => {
  let n = J.number();

  if (field.min !== undefined) {
    n = n.min(field.min);
  }
  if (field.max !== undefined) {
    n = n.max(field.max);
  }

  return n;
};

const getStr = (field: StrSchemaType) => {
  let s = J.string();

  if (field.min !== undefined) {
    s = s.min(field.min);
  }
  if (field.max !== undefined) {
    s = s.max(field.max);
  }

  return s;
};

const getFieldType = (
  field: FieldSchemaType<{
    type: 'enum';
    values: string[];
  }>
) => {
  switch (field.type) {
    case 'enum':
      return J.string().valid(...field.values);
    case 'string':
      return getStr(field);
    case 'email':
      return getStr(field).email();
    case 'number':
      return getNumber(field);
    case 'timestamp':
      return J.date();
    case 'bool':
      return J.bool();
    default:
      throw new TypeError(
        `"${(field as { type: string }).type}" is not implemented wey!`
      );
  }
};

const getFieldSchema = (
  field: FieldSchemaType<{
    type: 'enum';
    values: string[];
  }>
) => {
  let schema = getFieldType(field);

  if (field.default) {
    schema = schema.default(field.default);
  }

  if (field.required) {
    if (!field.default) {
      schema = schema.required();
    }
  }

  return schema;
};

const createSchema = <
  const S extends Record<string, FieldSchemaType<S[keyof S]>>,
>(
  table: string,
  _schema: S
) => {
  const schema = {} as Record<keyof S, ReturnType<typeof getFieldType>>;

  type EnumType = EnumSchemaType<S[keyof S]>;
  for (const [name, _field] of Object.entries(_schema)) {
    if ((_field as EnumType).type === 'enum') {
      if (
        !Array.isArray((_field as EnumType).values) ||
        !(_field as EnumType).values.length
      ) {
        throw new Error(
          `Field "${name}" in "${table}" has invalid enum values`
        );
      }
      if (
        _field.default &&
        !(_field as EnumType).values.includes(
          (_field as { default: string }).default
        )
      ) {
        throw new Error(
          `Field "${name}" in "${table}" default "${_field.default}" is not in enum values`
        );
      }
    }

    const field = getFieldSchema(_field as FieldSchemaType<unknown>);

    schema[name as keyof S] = field;
  }

  return J.object<Record<string, unknown>>(schema);
};

const Model = <const S extends Record<string, FieldSchemaType<S[keyof S]>>>(
  name: string,
  schema: S,
  options: {
    timestamp?: boolean;
  } = {}
) => {
  if (options.timestamp) {
    schema = {
      ...schema,
      createdAt: {
        type: 'timestamp',
        default: () => new Date(),
      },
      updatedAt: {
        type: 'timestamp',
        default: () => new Date(),
        onupdate: true,
      },
    };
  }

  const joiSchema = createSchema(name, schema);

  const create = async <P extends ProjectionType<S> | undefined = undefined>(
    data: Prettify<CreateInputType<S>>,
    projection?: P
  ): Promise<
    P extends ProjectionType<S> ? ResType<S, P> : CreateResType<S>
  > => {
    const { error, warning, value } = joiSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (warning) {
      console.warn(`warning into create "${name}"`, warning);
    }

    if (error) {
      throw new ValidetionError(
        `error into create "${name}"`,
        error.details.reduce(
          (acc, e) => {
            const pathMsg = acc[e.path.join('.')] ?? [];

            pathMsg.push({
              message: e.message,
            });
            acc[e.path.join('.')] = pathMsg;
            return acc;
          },
          {} as Record<string, { message: string }[]>
        )
      );
    }

    const [keys, placeHolder, params] = compiler.columns(value);

    const parts = [
      'INSERT',
      'INTO',
      name,
      `(${keys.join(',')})`,
      'VALUES',
      `(${placeHolder.join(',')})`,
    ];

    return `${parts.join(' ')} -> ${params.join(':')}` as any;
  };

  const find = async <P extends ProjectionType<S> | undefined = undefined>(
    where: FilterInferSchemaType<S> = {},
    projection?: P
  ): Promise<Prettify<ResType<S, P>>[]> => {
    const [filter, filterParams] = compiler.where(where);
    const select = compiler.select(projection as Record<string, boolean>);
    const [options, optionParams] = compiler.options(filterParams.length, {
      limit: 2,
    });

    const parts = ['SELECT', select, 'FROM', name];

    if (filter) {
      parts.push('WHERE', filter);
    }

    if (options) {
      parts.push(options);
    }

    return {
      parts,
      filterParams,
      optionParams,
    } as unknown as [];
  };

  return {
    create,
    find,
  };
};

const User = Model('users', {
  uname: { type: 'string', unique: true, required: true },
  email: { type: 'email', unique: true, required: true },
  password: { type: 'string', required: false, select: false },
  age: { type: 'number', default: 11, min: 10, max: 100, required: true },
  gender: {
    type: 'enum',
    values: ['male', 'female', 'other'],
    default: 'male',
  },
  isVerified: { type: 'bool', default: false },
  verifiedAt: { type: 'timestamp', default: 'now' },
  isActive: {
    type: 'bool',
    default: false,
  },
});

const main = async () => {
  try {
    const _user = await User.create({
      email: 'axjasmx@ncs.com',
      uname: 'axnalkn',
    });

    /*
		const _users = await User.find(
			{
				OR: [
					{
						email: "c;sacm;",
					},
					{
						AND: [
							{
								age: {
									gt: 7,
								},
							},
							{
								email: "a;x;a",
							},
						],
					},
					// { name: { like: "rahul" } },
					// // { AND: [
					// { age: { gt: 18, lt: 30 } },
					//     { email: { endsWith: '@gmail.com' } }
					//   ]
					// }
				],
				email: "a;x,a",
				// AND: [
				// 	{ name: { like: "rahul" } },
				// 	// { AND: [
				// 	{ age: { gt: 18, lt: 30 } },
				// 	//     { email: { endsWith: '@gmail.com' } }
				// 	//   ]
				// 	// }
				// ],
				// email: {
				// 	// in: ["raat", "xax", "xacvksnkj"],
				// 	// nin: ["raat", "xax", "xacvksnkj"],
				//     // eq:'amx',
				//     like:'la'
				// },
				// password: {
				// 	like: "anxnlsa",
				// },
				// age: 2,
				// verifiedAt: {
				// 	gt: 20,
				// },
				// gender
			},
			undefined,
		);

		/*

		*/
  } catch (e) {
    if (e instanceof ValidetionError) {
      console.error(`error -> `, e.meta);
    } else {
      console.error(`error -> `, e);
    }
  } finally {
    process.exit(0);
  }
};

main();
