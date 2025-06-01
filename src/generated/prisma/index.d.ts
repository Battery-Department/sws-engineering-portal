
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectStage
 * 
 */
export type ProjectStage = $Result.DefaultSelection<Prisma.$ProjectStagePayload>
/**
 * Model MaterialCost
 * 
 */
export type MaterialCost = $Result.DefaultSelection<Prisma.$MaterialCostPayload>
/**
 * Model SupplierInvoice
 * 
 */
export type SupplierInvoice = $Result.DefaultSelection<Prisma.$SupplierInvoicePayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model DocumentGeneration
 * 
 */
export type DocumentGeneration = $Result.DefaultSelection<Prisma.$DocumentGenerationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model RequirementSubmission
 * 
 */
export type RequirementSubmission = $Result.DefaultSelection<Prisma.$RequirementSubmissionPayload>
/**
 * Model InvoiceLine
 * 
 */
export type InvoiceLine = $Result.DefaultSelection<Prisma.$InvoiceLinePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectStage`: Exposes CRUD operations for the **ProjectStage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectStages
    * const projectStages = await prisma.projectStage.findMany()
    * ```
    */
  get projectStage(): Prisma.ProjectStageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.materialCost`: Exposes CRUD operations for the **MaterialCost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaterialCosts
    * const materialCosts = await prisma.materialCost.findMany()
    * ```
    */
  get materialCost(): Prisma.MaterialCostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supplierInvoice`: Exposes CRUD operations for the **SupplierInvoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupplierInvoices
    * const supplierInvoices = await prisma.supplierInvoice.findMany()
    * ```
    */
  get supplierInvoice(): Prisma.SupplierInvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentGeneration`: Exposes CRUD operations for the **DocumentGeneration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentGenerations
    * const documentGenerations = await prisma.documentGeneration.findMany()
    * ```
    */
  get documentGeneration(): Prisma.DocumentGenerationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requirementSubmission`: Exposes CRUD operations for the **RequirementSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequirementSubmissions
    * const requirementSubmissions = await prisma.requirementSubmission.findMany()
    * ```
    */
  get requirementSubmission(): Prisma.RequirementSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoiceLine`: Exposes CRUD operations for the **InvoiceLine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvoiceLines
    * const invoiceLines = await prisma.invoiceLine.findMany()
    * ```
    */
  get invoiceLine(): Prisma.InvoiceLineDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Client: 'Client',
    Project: 'Project',
    ProjectStage: 'ProjectStage',
    MaterialCost: 'MaterialCost',
    SupplierInvoice: 'SupplierInvoice',
    Document: 'Document',
    DocumentGeneration: 'DocumentGeneration',
    Message: 'Message',
    RequirementSubmission: 'RequirementSubmission',
    InvoiceLine: 'InvoiceLine'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "client" | "project" | "projectStage" | "materialCost" | "supplierInvoice" | "document" | "documentGeneration" | "message" | "requirementSubmission" | "invoiceLine"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectStage: {
        payload: Prisma.$ProjectStagePayload<ExtArgs>
        fields: Prisma.ProjectStageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectStageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectStageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>
          }
          findFirst: {
            args: Prisma.ProjectStageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectStageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>
          }
          findMany: {
            args: Prisma.ProjectStageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>[]
          }
          create: {
            args: Prisma.ProjectStageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>
          }
          createMany: {
            args: Prisma.ProjectStageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectStageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>[]
          }
          delete: {
            args: Prisma.ProjectStageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>
          }
          update: {
            args: Prisma.ProjectStageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>
          }
          deleteMany: {
            args: Prisma.ProjectStageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectStageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectStageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>[]
          }
          upsert: {
            args: Prisma.ProjectStageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStagePayload>
          }
          aggregate: {
            args: Prisma.ProjectStageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectStage>
          }
          groupBy: {
            args: Prisma.ProjectStageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectStageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectStageCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectStageCountAggregateOutputType> | number
          }
        }
      }
      MaterialCost: {
        payload: Prisma.$MaterialCostPayload<ExtArgs>
        fields: Prisma.MaterialCostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialCostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialCostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>
          }
          findFirst: {
            args: Prisma.MaterialCostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialCostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>
          }
          findMany: {
            args: Prisma.MaterialCostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>[]
          }
          create: {
            args: Prisma.MaterialCostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>
          }
          createMany: {
            args: Prisma.MaterialCostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaterialCostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>[]
          }
          delete: {
            args: Prisma.MaterialCostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>
          }
          update: {
            args: Prisma.MaterialCostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>
          }
          deleteMany: {
            args: Prisma.MaterialCostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialCostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaterialCostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>[]
          }
          upsert: {
            args: Prisma.MaterialCostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialCostPayload>
          }
          aggregate: {
            args: Prisma.MaterialCostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterialCost>
          }
          groupBy: {
            args: Prisma.MaterialCostGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialCostGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialCostCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialCostCountAggregateOutputType> | number
          }
        }
      }
      SupplierInvoice: {
        payload: Prisma.$SupplierInvoicePayload<ExtArgs>
        fields: Prisma.SupplierInvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierInvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierInvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>
          }
          findFirst: {
            args: Prisma.SupplierInvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierInvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>
          }
          findMany: {
            args: Prisma.SupplierInvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>[]
          }
          create: {
            args: Prisma.SupplierInvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>
          }
          createMany: {
            args: Prisma.SupplierInvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplierInvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>[]
          }
          delete: {
            args: Prisma.SupplierInvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>
          }
          update: {
            args: Prisma.SupplierInvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>
          }
          deleteMany: {
            args: Prisma.SupplierInvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierInvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupplierInvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>[]
          }
          upsert: {
            args: Prisma.SupplierInvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>
          }
          aggregate: {
            args: Prisma.SupplierInvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplierInvoice>
          }
          groupBy: {
            args: Prisma.SupplierInvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierInvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierInvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierInvoiceCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      DocumentGeneration: {
        payload: Prisma.$DocumentGenerationPayload<ExtArgs>
        fields: Prisma.DocumentGenerationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentGenerationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentGenerationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>
          }
          findFirst: {
            args: Prisma.DocumentGenerationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentGenerationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>
          }
          findMany: {
            args: Prisma.DocumentGenerationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>[]
          }
          create: {
            args: Prisma.DocumentGenerationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>
          }
          createMany: {
            args: Prisma.DocumentGenerationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentGenerationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>[]
          }
          delete: {
            args: Prisma.DocumentGenerationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>
          }
          update: {
            args: Prisma.DocumentGenerationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>
          }
          deleteMany: {
            args: Prisma.DocumentGenerationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentGenerationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentGenerationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>[]
          }
          upsert: {
            args: Prisma.DocumentGenerationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentGenerationPayload>
          }
          aggregate: {
            args: Prisma.DocumentGenerationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentGeneration>
          }
          groupBy: {
            args: Prisma.DocumentGenerationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGenerationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentGenerationCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentGenerationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      RequirementSubmission: {
        payload: Prisma.$RequirementSubmissionPayload<ExtArgs>
        fields: Prisma.RequirementSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequirementSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequirementSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>
          }
          findFirst: {
            args: Prisma.RequirementSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequirementSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>
          }
          findMany: {
            args: Prisma.RequirementSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>[]
          }
          create: {
            args: Prisma.RequirementSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>
          }
          createMany: {
            args: Prisma.RequirementSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequirementSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>[]
          }
          delete: {
            args: Prisma.RequirementSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>
          }
          update: {
            args: Prisma.RequirementSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.RequirementSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequirementSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequirementSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.RequirementSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequirementSubmissionPayload>
          }
          aggregate: {
            args: Prisma.RequirementSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequirementSubmission>
          }
          groupBy: {
            args: Prisma.RequirementSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequirementSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequirementSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<RequirementSubmissionCountAggregateOutputType> | number
          }
        }
      }
      InvoiceLine: {
        payload: Prisma.$InvoiceLinePayload<ExtArgs>
        fields: Prisma.InvoiceLineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceLineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceLineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          findFirst: {
            args: Prisma.InvoiceLineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceLineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          findMany: {
            args: Prisma.InvoiceLineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>[]
          }
          create: {
            args: Prisma.InvoiceLineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          createMany: {
            args: Prisma.InvoiceLineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceLineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>[]
          }
          delete: {
            args: Prisma.InvoiceLineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          update: {
            args: Prisma.InvoiceLineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceLineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceLineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceLineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceLineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          aggregate: {
            args: Prisma.InvoiceLineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoiceLine>
          }
          groupBy: {
            args: Prisma.InvoiceLineGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceLineGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceLineCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceLineCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    client?: ClientOmit
    project?: ProjectOmit
    projectStage?: ProjectStageOmit
    materialCost?: MaterialCostOmit
    supplierInvoice?: SupplierInvoiceOmit
    document?: DocumentOmit
    documentGeneration?: DocumentGenerationOmit
    message?: MessageOmit
    requirementSubmission?: RequirementSubmissionOmit
    invoiceLine?: InvoiceLineOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    messages: number
    projects: number
    requirements: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    requirements?: boolean | UserCountOutputTypeCountRequirementsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRequirementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequirementSubmissionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    projects: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | ClientCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    stages: number
    costs: number
    documents: number
    invoiceLines: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stages?: boolean | ProjectCountOutputTypeCountStagesArgs
    costs?: boolean | ProjectCountOutputTypeCountCostsArgs
    documents?: boolean | ProjectCountOutputTypeCountDocumentsArgs
    invoiceLines?: boolean | ProjectCountOutputTypeCountInvoiceLinesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountStagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectStageWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountCostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialCostWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountInvoiceLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceLineWhereInput
  }


  /**
   * Count Type SupplierInvoiceCountOutputType
   */

  export type SupplierInvoiceCountOutputType = {
    materialCosts: number
  }

  export type SupplierInvoiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    materialCosts?: boolean | SupplierInvoiceCountOutputTypeCountMaterialCostsArgs
  }

  // Custom InputTypes
  /**
   * SupplierInvoiceCountOutputType without action
   */
  export type SupplierInvoiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoiceCountOutputType
     */
    select?: SupplierInvoiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierInvoiceCountOutputType without action
   */
  export type SupplierInvoiceCountOutputTypeCountMaterialCostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialCostWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    generations: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    generations?: boolean | DocumentCountOutputTypeCountGenerationsArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountGenerationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentGenerationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | User$messagesArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    requirements?: boolean | User$requirementsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    client?: boolean | User$clientArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | User$messagesArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    requirements?: boolean | User$requirementsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    client?: boolean | User$clientArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      requirements: Prisma.$RequirementSubmissionPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      client: Prisma.$ClientPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    requirements<T extends User$requirementsArgs<ExtArgs> = {}>(args?: Subset<T, User$requirementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    client<T extends User$clientArgs<ExtArgs> = {}>(args?: Subset<T, User$clientArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.requirements
   */
  export type User$requirementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    where?: RequirementSubmissionWhereInput
    orderBy?: RequirementSubmissionOrderByWithRelationInput | RequirementSubmissionOrderByWithRelationInput[]
    cursor?: RequirementSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequirementSubmissionScalarFieldEnum | RequirementSubmissionScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.client
   */
  export type User$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    userId: string | null
    businessName: string | null
    industry: string | null
    phoneNumber: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    businessName: string | null
    industry: string | null
    phoneNumber: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    userId: number
    businessName: number
    industry: number
    phoneNumber: number
    address: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    industry?: true
    phoneNumber?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    industry?: true
    phoneNumber?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    industry?: true
    phoneNumber?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    userId: string
    businessName: string | null
    industry: string | null
    phoneNumber: string | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    industry?: boolean
    phoneNumber?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    projects?: boolean | Client$projectsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    industry?: boolean
    phoneNumber?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    industry?: boolean
    phoneNumber?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    userId?: boolean
    businessName?: boolean
    industry?: boolean
    phoneNumber?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "businessName" | "industry" | "phoneNumber" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    projects?: boolean | Client$projectsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      projects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      businessName: string | null
      industry: string | null
      phoneNumber: string | null
      address: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    projects<T extends Client$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Client$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly userId: FieldRef<"Client", 'String'>
    readonly businessName: FieldRef<"Client", 'String'>
    readonly industry: FieldRef<"Client", 'String'>
    readonly phoneNumber: FieldRef<"Client", 'String'>
    readonly address: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.projects
   */
  export type Client$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    estimatedHours: number | null
    actualHours: number | null
    quoteAmount: number | null
  }

  export type ProjectSumAggregateOutputType = {
    estimatedHours: number | null
    actualHours: number | null
    quoteAmount: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    projectRef: string | null
    name: string | null
    description: string | null
    service: string | null
    status: string | null
    priority: string | null
    estimatedHours: number | null
    actualHours: number | null
    quoteAmount: number | null
    location: string | null
    startDate: Date | null
    targetDate: Date | null
    completedDate: Date | null
    currentStage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    clientId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    projectRef: string | null
    name: string | null
    description: string | null
    service: string | null
    status: string | null
    priority: string | null
    estimatedHours: number | null
    actualHours: number | null
    quoteAmount: number | null
    location: string | null
    startDate: Date | null
    targetDate: Date | null
    completedDate: Date | null
    currentStage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    clientId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    projectRef: number
    name: number
    description: number
    service: number
    status: number
    priority: number
    estimatedHours: number
    actualHours: number
    quoteAmount: number
    location: number
    startDate: number
    targetDate: number
    completedDate: number
    currentStage: number
    createdAt: number
    updatedAt: number
    createdBy: number
    clientId: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    estimatedHours?: true
    actualHours?: true
    quoteAmount?: true
  }

  export type ProjectSumAggregateInputType = {
    estimatedHours?: true
    actualHours?: true
    quoteAmount?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    projectRef?: true
    name?: true
    description?: true
    service?: true
    status?: true
    priority?: true
    estimatedHours?: true
    actualHours?: true
    quoteAmount?: true
    location?: true
    startDate?: true
    targetDate?: true
    completedDate?: true
    currentStage?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    clientId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    projectRef?: true
    name?: true
    description?: true
    service?: true
    status?: true
    priority?: true
    estimatedHours?: true
    actualHours?: true
    quoteAmount?: true
    location?: true
    startDate?: true
    targetDate?: true
    completedDate?: true
    currentStage?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    clientId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    projectRef?: true
    name?: true
    description?: true
    service?: true
    status?: true
    priority?: true
    estimatedHours?: true
    actualHours?: true
    quoteAmount?: true
    location?: true
    startDate?: true
    targetDate?: true
    completedDate?: true
    currentStage?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    clientId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    projectRef: string
    name: string
    description: string | null
    service: string
    status: string
    priority: string
    estimatedHours: number | null
    actualHours: number | null
    quoteAmount: number | null
    location: string | null
    startDate: Date | null
    targetDate: Date | null
    completedDate: Date | null
    currentStage: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    clientId: string | null
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectRef?: boolean
    name?: boolean
    description?: boolean
    service?: boolean
    status?: boolean
    priority?: boolean
    estimatedHours?: boolean
    actualHours?: boolean
    quoteAmount?: boolean
    location?: boolean
    startDate?: boolean
    targetDate?: boolean
    completedDate?: boolean
    currentStage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    clientId?: boolean
    creator?: boolean | Project$creatorArgs<ExtArgs>
    client?: boolean | Project$clientArgs<ExtArgs>
    stages?: boolean | Project$stagesArgs<ExtArgs>
    costs?: boolean | Project$costsArgs<ExtArgs>
    documents?: boolean | Project$documentsArgs<ExtArgs>
    invoiceLines?: boolean | Project$invoiceLinesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectRef?: boolean
    name?: boolean
    description?: boolean
    service?: boolean
    status?: boolean
    priority?: boolean
    estimatedHours?: boolean
    actualHours?: boolean
    quoteAmount?: boolean
    location?: boolean
    startDate?: boolean
    targetDate?: boolean
    completedDate?: boolean
    currentStage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    clientId?: boolean
    creator?: boolean | Project$creatorArgs<ExtArgs>
    client?: boolean | Project$clientArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectRef?: boolean
    name?: boolean
    description?: boolean
    service?: boolean
    status?: boolean
    priority?: boolean
    estimatedHours?: boolean
    actualHours?: boolean
    quoteAmount?: boolean
    location?: boolean
    startDate?: boolean
    targetDate?: boolean
    completedDate?: boolean
    currentStage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    clientId?: boolean
    creator?: boolean | Project$creatorArgs<ExtArgs>
    client?: boolean | Project$clientArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    projectRef?: boolean
    name?: boolean
    description?: boolean
    service?: boolean
    status?: boolean
    priority?: boolean
    estimatedHours?: boolean
    actualHours?: boolean
    quoteAmount?: boolean
    location?: boolean
    startDate?: boolean
    targetDate?: boolean
    completedDate?: boolean
    currentStage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    clientId?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectRef" | "name" | "description" | "service" | "status" | "priority" | "estimatedHours" | "actualHours" | "quoteAmount" | "location" | "startDate" | "targetDate" | "completedDate" | "currentStage" | "createdAt" | "updatedAt" | "createdBy" | "clientId", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Project$creatorArgs<ExtArgs>
    client?: boolean | Project$clientArgs<ExtArgs>
    stages?: boolean | Project$stagesArgs<ExtArgs>
    costs?: boolean | Project$costsArgs<ExtArgs>
    documents?: boolean | Project$documentsArgs<ExtArgs>
    invoiceLines?: boolean | Project$invoiceLinesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Project$creatorArgs<ExtArgs>
    client?: boolean | Project$clientArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Project$creatorArgs<ExtArgs>
    client?: boolean | Project$clientArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs> | null
      client: Prisma.$ClientPayload<ExtArgs> | null
      stages: Prisma.$ProjectStagePayload<ExtArgs>[]
      costs: Prisma.$MaterialCostPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      invoiceLines: Prisma.$InvoiceLinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectRef: string
      name: string
      description: string | null
      service: string
      status: string
      priority: string
      estimatedHours: number | null
      actualHours: number | null
      quoteAmount: number | null
      location: string | null
      startDate: Date | null
      targetDate: Date | null
      completedDate: Date | null
      currentStage: string | null
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      clientId: string | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends Project$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Project$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    client<T extends Project$clientArgs<ExtArgs> = {}>(args?: Subset<T, Project$clientArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    stages<T extends Project$stagesArgs<ExtArgs> = {}>(args?: Subset<T, Project$stagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    costs<T extends Project$costsArgs<ExtArgs> = {}>(args?: Subset<T, Project$costsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Project$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Project$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invoiceLines<T extends Project$invoiceLinesArgs<ExtArgs> = {}>(args?: Subset<T, Project$invoiceLinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly projectRef: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly service: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'String'>
    readonly priority: FieldRef<"Project", 'String'>
    readonly estimatedHours: FieldRef<"Project", 'Int'>
    readonly actualHours: FieldRef<"Project", 'Int'>
    readonly quoteAmount: FieldRef<"Project", 'Float'>
    readonly location: FieldRef<"Project", 'String'>
    readonly startDate: FieldRef<"Project", 'DateTime'>
    readonly targetDate: FieldRef<"Project", 'DateTime'>
    readonly completedDate: FieldRef<"Project", 'DateTime'>
    readonly currentStage: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly createdBy: FieldRef<"Project", 'String'>
    readonly clientId: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.creator
   */
  export type Project$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Project.client
   */
  export type Project$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
  }

  /**
   * Project.stages
   */
  export type Project$stagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    where?: ProjectStageWhereInput
    orderBy?: ProjectStageOrderByWithRelationInput | ProjectStageOrderByWithRelationInput[]
    cursor?: ProjectStageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectStageScalarFieldEnum | ProjectStageScalarFieldEnum[]
  }

  /**
   * Project.costs
   */
  export type Project$costsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    where?: MaterialCostWhereInput
    orderBy?: MaterialCostOrderByWithRelationInput | MaterialCostOrderByWithRelationInput[]
    cursor?: MaterialCostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaterialCostScalarFieldEnum | MaterialCostScalarFieldEnum[]
  }

  /**
   * Project.documents
   */
  export type Project$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Project.invoiceLines
   */
  export type Project$invoiceLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    where?: InvoiceLineWhereInput
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    cursor?: InvoiceLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceLineScalarFieldEnum | InvoiceLineScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectStage
   */

  export type AggregateProjectStage = {
    _count: ProjectStageCountAggregateOutputType | null
    _avg: ProjectStageAvgAggregateOutputType | null
    _sum: ProjectStageSumAggregateOutputType | null
    _min: ProjectStageMinAggregateOutputType | null
    _max: ProjectStageMaxAggregateOutputType | null
  }

  export type ProjectStageAvgAggregateOutputType = {
    order: number | null
  }

  export type ProjectStageSumAggregateOutputType = {
    order: number | null
  }

  export type ProjectStageMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    stageName: string | null
    status: string | null
    order: number | null
    startedAt: Date | null
    completedAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectStageMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    stageName: string | null
    status: string | null
    order: number | null
    startedAt: Date | null
    completedAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectStageCountAggregateOutputType = {
    id: number
    projectId: number
    stageName: number
    status: number
    order: number
    startedAt: number
    completedAt: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectStageAvgAggregateInputType = {
    order?: true
  }

  export type ProjectStageSumAggregateInputType = {
    order?: true
  }

  export type ProjectStageMinAggregateInputType = {
    id?: true
    projectId?: true
    stageName?: true
    status?: true
    order?: true
    startedAt?: true
    completedAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectStageMaxAggregateInputType = {
    id?: true
    projectId?: true
    stageName?: true
    status?: true
    order?: true
    startedAt?: true
    completedAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectStageCountAggregateInputType = {
    id?: true
    projectId?: true
    stageName?: true
    status?: true
    order?: true
    startedAt?: true
    completedAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectStageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectStage to aggregate.
     */
    where?: ProjectStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStages to fetch.
     */
    orderBy?: ProjectStageOrderByWithRelationInput | ProjectStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectStages
    **/
    _count?: true | ProjectStageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectStageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectStageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectStageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectStageMaxAggregateInputType
  }

  export type GetProjectStageAggregateType<T extends ProjectStageAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectStage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectStage[P]>
      : GetScalarType<T[P], AggregateProjectStage[P]>
  }




  export type ProjectStageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectStageWhereInput
    orderBy?: ProjectStageOrderByWithAggregationInput | ProjectStageOrderByWithAggregationInput[]
    by: ProjectStageScalarFieldEnum[] | ProjectStageScalarFieldEnum
    having?: ProjectStageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectStageCountAggregateInputType | true
    _avg?: ProjectStageAvgAggregateInputType
    _sum?: ProjectStageSumAggregateInputType
    _min?: ProjectStageMinAggregateInputType
    _max?: ProjectStageMaxAggregateInputType
  }

  export type ProjectStageGroupByOutputType = {
    id: string
    projectId: string
    stageName: string
    status: string
    order: number
    startedAt: Date | null
    completedAt: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectStageCountAggregateOutputType | null
    _avg: ProjectStageAvgAggregateOutputType | null
    _sum: ProjectStageSumAggregateOutputType | null
    _min: ProjectStageMinAggregateOutputType | null
    _max: ProjectStageMaxAggregateOutputType | null
  }

  type GetProjectStageGroupByPayload<T extends ProjectStageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectStageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectStageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectStageGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectStageGroupByOutputType[P]>
        }
      >
    >


  export type ProjectStageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    stageName?: boolean
    status?: boolean
    order?: boolean
    startedAt?: boolean
    completedAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectStage"]>

  export type ProjectStageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    stageName?: boolean
    status?: boolean
    order?: boolean
    startedAt?: boolean
    completedAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectStage"]>

  export type ProjectStageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    stageName?: boolean
    status?: boolean
    order?: boolean
    startedAt?: boolean
    completedAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectStage"]>

  export type ProjectStageSelectScalar = {
    id?: boolean
    projectId?: boolean
    stageName?: boolean
    status?: boolean
    order?: boolean
    startedAt?: boolean
    completedAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectStageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "stageName" | "status" | "order" | "startedAt" | "completedAt" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["projectStage"]>
  export type ProjectStageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectStageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectStageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectStagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectStage"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      stageName: string
      status: string
      order: number
      startedAt: Date | null
      completedAt: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectStage"]>
    composites: {}
  }

  type ProjectStageGetPayload<S extends boolean | null | undefined | ProjectStageDefaultArgs> = $Result.GetResult<Prisma.$ProjectStagePayload, S>

  type ProjectStageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectStageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectStageCountAggregateInputType | true
    }

  export interface ProjectStageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectStage'], meta: { name: 'ProjectStage' } }
    /**
     * Find zero or one ProjectStage that matches the filter.
     * @param {ProjectStageFindUniqueArgs} args - Arguments to find a ProjectStage
     * @example
     * // Get one ProjectStage
     * const projectStage = await prisma.projectStage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectStageFindUniqueArgs>(args: SelectSubset<T, ProjectStageFindUniqueArgs<ExtArgs>>): Prisma__ProjectStageClient<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectStage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectStageFindUniqueOrThrowArgs} args - Arguments to find a ProjectStage
     * @example
     * // Get one ProjectStage
     * const projectStage = await prisma.projectStage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectStageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectStageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectStageClient<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectStage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStageFindFirstArgs} args - Arguments to find a ProjectStage
     * @example
     * // Get one ProjectStage
     * const projectStage = await prisma.projectStage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectStageFindFirstArgs>(args?: SelectSubset<T, ProjectStageFindFirstArgs<ExtArgs>>): Prisma__ProjectStageClient<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectStage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStageFindFirstOrThrowArgs} args - Arguments to find a ProjectStage
     * @example
     * // Get one ProjectStage
     * const projectStage = await prisma.projectStage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectStageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectStageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectStageClient<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectStages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectStages
     * const projectStages = await prisma.projectStage.findMany()
     * 
     * // Get first 10 ProjectStages
     * const projectStages = await prisma.projectStage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectStageWithIdOnly = await prisma.projectStage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectStageFindManyArgs>(args?: SelectSubset<T, ProjectStageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectStage.
     * @param {ProjectStageCreateArgs} args - Arguments to create a ProjectStage.
     * @example
     * // Create one ProjectStage
     * const ProjectStage = await prisma.projectStage.create({
     *   data: {
     *     // ... data to create a ProjectStage
     *   }
     * })
     * 
     */
    create<T extends ProjectStageCreateArgs>(args: SelectSubset<T, ProjectStageCreateArgs<ExtArgs>>): Prisma__ProjectStageClient<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectStages.
     * @param {ProjectStageCreateManyArgs} args - Arguments to create many ProjectStages.
     * @example
     * // Create many ProjectStages
     * const projectStage = await prisma.projectStage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectStageCreateManyArgs>(args?: SelectSubset<T, ProjectStageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectStages and returns the data saved in the database.
     * @param {ProjectStageCreateManyAndReturnArgs} args - Arguments to create many ProjectStages.
     * @example
     * // Create many ProjectStages
     * const projectStage = await prisma.projectStage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectStages and only return the `id`
     * const projectStageWithIdOnly = await prisma.projectStage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectStageCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectStageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectStage.
     * @param {ProjectStageDeleteArgs} args - Arguments to delete one ProjectStage.
     * @example
     * // Delete one ProjectStage
     * const ProjectStage = await prisma.projectStage.delete({
     *   where: {
     *     // ... filter to delete one ProjectStage
     *   }
     * })
     * 
     */
    delete<T extends ProjectStageDeleteArgs>(args: SelectSubset<T, ProjectStageDeleteArgs<ExtArgs>>): Prisma__ProjectStageClient<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectStage.
     * @param {ProjectStageUpdateArgs} args - Arguments to update one ProjectStage.
     * @example
     * // Update one ProjectStage
     * const projectStage = await prisma.projectStage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectStageUpdateArgs>(args: SelectSubset<T, ProjectStageUpdateArgs<ExtArgs>>): Prisma__ProjectStageClient<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectStages.
     * @param {ProjectStageDeleteManyArgs} args - Arguments to filter ProjectStages to delete.
     * @example
     * // Delete a few ProjectStages
     * const { count } = await prisma.projectStage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectStageDeleteManyArgs>(args?: SelectSubset<T, ProjectStageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectStages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectStages
     * const projectStage = await prisma.projectStage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectStageUpdateManyArgs>(args: SelectSubset<T, ProjectStageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectStages and returns the data updated in the database.
     * @param {ProjectStageUpdateManyAndReturnArgs} args - Arguments to update many ProjectStages.
     * @example
     * // Update many ProjectStages
     * const projectStage = await prisma.projectStage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectStages and only return the `id`
     * const projectStageWithIdOnly = await prisma.projectStage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectStageUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectStageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectStage.
     * @param {ProjectStageUpsertArgs} args - Arguments to update or create a ProjectStage.
     * @example
     * // Update or create a ProjectStage
     * const projectStage = await prisma.projectStage.upsert({
     *   create: {
     *     // ... data to create a ProjectStage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectStage we want to update
     *   }
     * })
     */
    upsert<T extends ProjectStageUpsertArgs>(args: SelectSubset<T, ProjectStageUpsertArgs<ExtArgs>>): Prisma__ProjectStageClient<$Result.GetResult<Prisma.$ProjectStagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectStages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStageCountArgs} args - Arguments to filter ProjectStages to count.
     * @example
     * // Count the number of ProjectStages
     * const count = await prisma.projectStage.count({
     *   where: {
     *     // ... the filter for the ProjectStages we want to count
     *   }
     * })
    **/
    count<T extends ProjectStageCountArgs>(
      args?: Subset<T, ProjectStageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectStageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectStage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectStageAggregateArgs>(args: Subset<T, ProjectStageAggregateArgs>): Prisma.PrismaPromise<GetProjectStageAggregateType<T>>

    /**
     * Group by ProjectStage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectStageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectStageGroupByArgs['orderBy'] }
        : { orderBy?: ProjectStageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectStageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectStageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectStage model
   */
  readonly fields: ProjectStageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectStage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectStageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectStage model
   */
  interface ProjectStageFieldRefs {
    readonly id: FieldRef<"ProjectStage", 'String'>
    readonly projectId: FieldRef<"ProjectStage", 'String'>
    readonly stageName: FieldRef<"ProjectStage", 'String'>
    readonly status: FieldRef<"ProjectStage", 'String'>
    readonly order: FieldRef<"ProjectStage", 'Int'>
    readonly startedAt: FieldRef<"ProjectStage", 'DateTime'>
    readonly completedAt: FieldRef<"ProjectStage", 'DateTime'>
    readonly notes: FieldRef<"ProjectStage", 'String'>
    readonly createdAt: FieldRef<"ProjectStage", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectStage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectStage findUnique
   */
  export type ProjectStageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStage to fetch.
     */
    where: ProjectStageWhereUniqueInput
  }

  /**
   * ProjectStage findUniqueOrThrow
   */
  export type ProjectStageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStage to fetch.
     */
    where: ProjectStageWhereUniqueInput
  }

  /**
   * ProjectStage findFirst
   */
  export type ProjectStageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStage to fetch.
     */
    where?: ProjectStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStages to fetch.
     */
    orderBy?: ProjectStageOrderByWithRelationInput | ProjectStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectStages.
     */
    cursor?: ProjectStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectStages.
     */
    distinct?: ProjectStageScalarFieldEnum | ProjectStageScalarFieldEnum[]
  }

  /**
   * ProjectStage findFirstOrThrow
   */
  export type ProjectStageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStage to fetch.
     */
    where?: ProjectStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStages to fetch.
     */
    orderBy?: ProjectStageOrderByWithRelationInput | ProjectStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectStages.
     */
    cursor?: ProjectStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectStages.
     */
    distinct?: ProjectStageScalarFieldEnum | ProjectStageScalarFieldEnum[]
  }

  /**
   * ProjectStage findMany
   */
  export type ProjectStageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStages to fetch.
     */
    where?: ProjectStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStages to fetch.
     */
    orderBy?: ProjectStageOrderByWithRelationInput | ProjectStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectStages.
     */
    cursor?: ProjectStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStages.
     */
    skip?: number
    distinct?: ProjectStageScalarFieldEnum | ProjectStageScalarFieldEnum[]
  }

  /**
   * ProjectStage create
   */
  export type ProjectStageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectStage.
     */
    data: XOR<ProjectStageCreateInput, ProjectStageUncheckedCreateInput>
  }

  /**
   * ProjectStage createMany
   */
  export type ProjectStageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectStages.
     */
    data: ProjectStageCreateManyInput | ProjectStageCreateManyInput[]
  }

  /**
   * ProjectStage createManyAndReturn
   */
  export type ProjectStageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectStages.
     */
    data: ProjectStageCreateManyInput | ProjectStageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectStage update
   */
  export type ProjectStageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectStage.
     */
    data: XOR<ProjectStageUpdateInput, ProjectStageUncheckedUpdateInput>
    /**
     * Choose, which ProjectStage to update.
     */
    where: ProjectStageWhereUniqueInput
  }

  /**
   * ProjectStage updateMany
   */
  export type ProjectStageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectStages.
     */
    data: XOR<ProjectStageUpdateManyMutationInput, ProjectStageUncheckedUpdateManyInput>
    /**
     * Filter which ProjectStages to update
     */
    where?: ProjectStageWhereInput
    /**
     * Limit how many ProjectStages to update.
     */
    limit?: number
  }

  /**
   * ProjectStage updateManyAndReturn
   */
  export type ProjectStageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * The data used to update ProjectStages.
     */
    data: XOR<ProjectStageUpdateManyMutationInput, ProjectStageUncheckedUpdateManyInput>
    /**
     * Filter which ProjectStages to update
     */
    where?: ProjectStageWhereInput
    /**
     * Limit how many ProjectStages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectStage upsert
   */
  export type ProjectStageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectStage to update in case it exists.
     */
    where: ProjectStageWhereUniqueInput
    /**
     * In case the ProjectStage found by the `where` argument doesn't exist, create a new ProjectStage with this data.
     */
    create: XOR<ProjectStageCreateInput, ProjectStageUncheckedCreateInput>
    /**
     * In case the ProjectStage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectStageUpdateInput, ProjectStageUncheckedUpdateInput>
  }

  /**
   * ProjectStage delete
   */
  export type ProjectStageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
    /**
     * Filter which ProjectStage to delete.
     */
    where: ProjectStageWhereUniqueInput
  }

  /**
   * ProjectStage deleteMany
   */
  export type ProjectStageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectStages to delete
     */
    where?: ProjectStageWhereInput
    /**
     * Limit how many ProjectStages to delete.
     */
    limit?: number
  }

  /**
   * ProjectStage without action
   */
  export type ProjectStageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStage
     */
    select?: ProjectStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStage
     */
    omit?: ProjectStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStageInclude<ExtArgs> | null
  }


  /**
   * Model MaterialCost
   */

  export type AggregateMaterialCost = {
    _count: MaterialCostCountAggregateOutputType | null
    _avg: MaterialCostAvgAggregateOutputType | null
    _sum: MaterialCostSumAggregateOutputType | null
    _min: MaterialCostMinAggregateOutputType | null
    _max: MaterialCostMaxAggregateOutputType | null
  }

  export type MaterialCostAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalCost: number | null
  }

  export type MaterialCostSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalCost: number | null
  }

  export type MaterialCostMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    material: string | null
    quantity: number | null
    unitPrice: number | null
    totalCost: number | null
    supplier: string | null
    category: string | null
    date: Date | null
    invoiceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaterialCostMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    material: string | null
    quantity: number | null
    unitPrice: number | null
    totalCost: number | null
    supplier: string | null
    category: string | null
    date: Date | null
    invoiceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaterialCostCountAggregateOutputType = {
    id: number
    projectId: number
    material: number
    quantity: number
    unitPrice: number
    totalCost: number
    supplier: number
    category: number
    date: number
    invoiceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MaterialCostAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalCost?: true
  }

  export type MaterialCostSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalCost?: true
  }

  export type MaterialCostMinAggregateInputType = {
    id?: true
    projectId?: true
    material?: true
    quantity?: true
    unitPrice?: true
    totalCost?: true
    supplier?: true
    category?: true
    date?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaterialCostMaxAggregateInputType = {
    id?: true
    projectId?: true
    material?: true
    quantity?: true
    unitPrice?: true
    totalCost?: true
    supplier?: true
    category?: true
    date?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaterialCostCountAggregateInputType = {
    id?: true
    projectId?: true
    material?: true
    quantity?: true
    unitPrice?: true
    totalCost?: true
    supplier?: true
    category?: true
    date?: true
    invoiceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MaterialCostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialCost to aggregate.
     */
    where?: MaterialCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialCosts to fetch.
     */
    orderBy?: MaterialCostOrderByWithRelationInput | MaterialCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaterialCosts
    **/
    _count?: true | MaterialCostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialCostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialCostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialCostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialCostMaxAggregateInputType
  }

  export type GetMaterialCostAggregateType<T extends MaterialCostAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterialCost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterialCost[P]>
      : GetScalarType<T[P], AggregateMaterialCost[P]>
  }




  export type MaterialCostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialCostWhereInput
    orderBy?: MaterialCostOrderByWithAggregationInput | MaterialCostOrderByWithAggregationInput[]
    by: MaterialCostScalarFieldEnum[] | MaterialCostScalarFieldEnum
    having?: MaterialCostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialCostCountAggregateInputType | true
    _avg?: MaterialCostAvgAggregateInputType
    _sum?: MaterialCostSumAggregateInputType
    _min?: MaterialCostMinAggregateInputType
    _max?: MaterialCostMaxAggregateInputType
  }

  export type MaterialCostGroupByOutputType = {
    id: string
    projectId: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier: string | null
    category: string | null
    date: Date
    invoiceId: string | null
    createdAt: Date
    updatedAt: Date
    _count: MaterialCostCountAggregateOutputType | null
    _avg: MaterialCostAvgAggregateOutputType | null
    _sum: MaterialCostSumAggregateOutputType | null
    _min: MaterialCostMinAggregateOutputType | null
    _max: MaterialCostMaxAggregateOutputType | null
  }

  type GetMaterialCostGroupByPayload<T extends MaterialCostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialCostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialCostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialCostGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialCostGroupByOutputType[P]>
        }
      >
    >


  export type MaterialCostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    material?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalCost?: boolean
    supplier?: boolean
    category?: boolean
    date?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    invoice?: boolean | MaterialCost$invoiceArgs<ExtArgs>
  }, ExtArgs["result"]["materialCost"]>

  export type MaterialCostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    material?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalCost?: boolean
    supplier?: boolean
    category?: boolean
    date?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    invoice?: boolean | MaterialCost$invoiceArgs<ExtArgs>
  }, ExtArgs["result"]["materialCost"]>

  export type MaterialCostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    material?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalCost?: boolean
    supplier?: boolean
    category?: boolean
    date?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    invoice?: boolean | MaterialCost$invoiceArgs<ExtArgs>
  }, ExtArgs["result"]["materialCost"]>

  export type MaterialCostSelectScalar = {
    id?: boolean
    projectId?: boolean
    material?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalCost?: boolean
    supplier?: boolean
    category?: boolean
    date?: boolean
    invoiceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MaterialCostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "material" | "quantity" | "unitPrice" | "totalCost" | "supplier" | "category" | "date" | "invoiceId" | "createdAt" | "updatedAt", ExtArgs["result"]["materialCost"]>
  export type MaterialCostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    invoice?: boolean | MaterialCost$invoiceArgs<ExtArgs>
  }
  export type MaterialCostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    invoice?: boolean | MaterialCost$invoiceArgs<ExtArgs>
  }
  export type MaterialCostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    invoice?: boolean | MaterialCost$invoiceArgs<ExtArgs>
  }

  export type $MaterialCostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaterialCost"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      invoice: Prisma.$SupplierInvoicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      material: string
      quantity: number
      unitPrice: number
      totalCost: number
      supplier: string | null
      category: string | null
      date: Date
      invoiceId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["materialCost"]>
    composites: {}
  }

  type MaterialCostGetPayload<S extends boolean | null | undefined | MaterialCostDefaultArgs> = $Result.GetResult<Prisma.$MaterialCostPayload, S>

  type MaterialCostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialCostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialCostCountAggregateInputType | true
    }

  export interface MaterialCostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaterialCost'], meta: { name: 'MaterialCost' } }
    /**
     * Find zero or one MaterialCost that matches the filter.
     * @param {MaterialCostFindUniqueArgs} args - Arguments to find a MaterialCost
     * @example
     * // Get one MaterialCost
     * const materialCost = await prisma.materialCost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialCostFindUniqueArgs>(args: SelectSubset<T, MaterialCostFindUniqueArgs<ExtArgs>>): Prisma__MaterialCostClient<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MaterialCost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialCostFindUniqueOrThrowArgs} args - Arguments to find a MaterialCost
     * @example
     * // Get one MaterialCost
     * const materialCost = await prisma.materialCost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialCostFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialCostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialCostClient<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialCost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCostFindFirstArgs} args - Arguments to find a MaterialCost
     * @example
     * // Get one MaterialCost
     * const materialCost = await prisma.materialCost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialCostFindFirstArgs>(args?: SelectSubset<T, MaterialCostFindFirstArgs<ExtArgs>>): Prisma__MaterialCostClient<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialCost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCostFindFirstOrThrowArgs} args - Arguments to find a MaterialCost
     * @example
     * // Get one MaterialCost
     * const materialCost = await prisma.materialCost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialCostFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialCostFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialCostClient<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaterialCosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaterialCosts
     * const materialCosts = await prisma.materialCost.findMany()
     * 
     * // Get first 10 MaterialCosts
     * const materialCosts = await prisma.materialCost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialCostWithIdOnly = await prisma.materialCost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialCostFindManyArgs>(args?: SelectSubset<T, MaterialCostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MaterialCost.
     * @param {MaterialCostCreateArgs} args - Arguments to create a MaterialCost.
     * @example
     * // Create one MaterialCost
     * const MaterialCost = await prisma.materialCost.create({
     *   data: {
     *     // ... data to create a MaterialCost
     *   }
     * })
     * 
     */
    create<T extends MaterialCostCreateArgs>(args: SelectSubset<T, MaterialCostCreateArgs<ExtArgs>>): Prisma__MaterialCostClient<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MaterialCosts.
     * @param {MaterialCostCreateManyArgs} args - Arguments to create many MaterialCosts.
     * @example
     * // Create many MaterialCosts
     * const materialCost = await prisma.materialCost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialCostCreateManyArgs>(args?: SelectSubset<T, MaterialCostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaterialCosts and returns the data saved in the database.
     * @param {MaterialCostCreateManyAndReturnArgs} args - Arguments to create many MaterialCosts.
     * @example
     * // Create many MaterialCosts
     * const materialCost = await prisma.materialCost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaterialCosts and only return the `id`
     * const materialCostWithIdOnly = await prisma.materialCost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaterialCostCreateManyAndReturnArgs>(args?: SelectSubset<T, MaterialCostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MaterialCost.
     * @param {MaterialCostDeleteArgs} args - Arguments to delete one MaterialCost.
     * @example
     * // Delete one MaterialCost
     * const MaterialCost = await prisma.materialCost.delete({
     *   where: {
     *     // ... filter to delete one MaterialCost
     *   }
     * })
     * 
     */
    delete<T extends MaterialCostDeleteArgs>(args: SelectSubset<T, MaterialCostDeleteArgs<ExtArgs>>): Prisma__MaterialCostClient<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MaterialCost.
     * @param {MaterialCostUpdateArgs} args - Arguments to update one MaterialCost.
     * @example
     * // Update one MaterialCost
     * const materialCost = await prisma.materialCost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialCostUpdateArgs>(args: SelectSubset<T, MaterialCostUpdateArgs<ExtArgs>>): Prisma__MaterialCostClient<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MaterialCosts.
     * @param {MaterialCostDeleteManyArgs} args - Arguments to filter MaterialCosts to delete.
     * @example
     * // Delete a few MaterialCosts
     * const { count } = await prisma.materialCost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialCostDeleteManyArgs>(args?: SelectSubset<T, MaterialCostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaterialCosts
     * const materialCost = await prisma.materialCost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialCostUpdateManyArgs>(args: SelectSubset<T, MaterialCostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialCosts and returns the data updated in the database.
     * @param {MaterialCostUpdateManyAndReturnArgs} args - Arguments to update many MaterialCosts.
     * @example
     * // Update many MaterialCosts
     * const materialCost = await prisma.materialCost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MaterialCosts and only return the `id`
     * const materialCostWithIdOnly = await prisma.materialCost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MaterialCostUpdateManyAndReturnArgs>(args: SelectSubset<T, MaterialCostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MaterialCost.
     * @param {MaterialCostUpsertArgs} args - Arguments to update or create a MaterialCost.
     * @example
     * // Update or create a MaterialCost
     * const materialCost = await prisma.materialCost.upsert({
     *   create: {
     *     // ... data to create a MaterialCost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaterialCost we want to update
     *   }
     * })
     */
    upsert<T extends MaterialCostUpsertArgs>(args: SelectSubset<T, MaterialCostUpsertArgs<ExtArgs>>): Prisma__MaterialCostClient<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MaterialCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCostCountArgs} args - Arguments to filter MaterialCosts to count.
     * @example
     * // Count the number of MaterialCosts
     * const count = await prisma.materialCost.count({
     *   where: {
     *     // ... the filter for the MaterialCosts we want to count
     *   }
     * })
    **/
    count<T extends MaterialCostCountArgs>(
      args?: Subset<T, MaterialCostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialCostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaterialCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaterialCostAggregateArgs>(args: Subset<T, MaterialCostAggregateArgs>): Prisma.PrismaPromise<GetMaterialCostAggregateType<T>>

    /**
     * Group by MaterialCost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MaterialCostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialCostGroupByArgs['orderBy'] }
        : { orderBy?: MaterialCostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MaterialCostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialCostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaterialCost model
   */
  readonly fields: MaterialCostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaterialCost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialCostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invoice<T extends MaterialCost$invoiceArgs<ExtArgs> = {}>(args?: Subset<T, MaterialCost$invoiceArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MaterialCost model
   */
  interface MaterialCostFieldRefs {
    readonly id: FieldRef<"MaterialCost", 'String'>
    readonly projectId: FieldRef<"MaterialCost", 'String'>
    readonly material: FieldRef<"MaterialCost", 'String'>
    readonly quantity: FieldRef<"MaterialCost", 'Float'>
    readonly unitPrice: FieldRef<"MaterialCost", 'Float'>
    readonly totalCost: FieldRef<"MaterialCost", 'Float'>
    readonly supplier: FieldRef<"MaterialCost", 'String'>
    readonly category: FieldRef<"MaterialCost", 'String'>
    readonly date: FieldRef<"MaterialCost", 'DateTime'>
    readonly invoiceId: FieldRef<"MaterialCost", 'String'>
    readonly createdAt: FieldRef<"MaterialCost", 'DateTime'>
    readonly updatedAt: FieldRef<"MaterialCost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MaterialCost findUnique
   */
  export type MaterialCostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * Filter, which MaterialCost to fetch.
     */
    where: MaterialCostWhereUniqueInput
  }

  /**
   * MaterialCost findUniqueOrThrow
   */
  export type MaterialCostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * Filter, which MaterialCost to fetch.
     */
    where: MaterialCostWhereUniqueInput
  }

  /**
   * MaterialCost findFirst
   */
  export type MaterialCostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * Filter, which MaterialCost to fetch.
     */
    where?: MaterialCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialCosts to fetch.
     */
    orderBy?: MaterialCostOrderByWithRelationInput | MaterialCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialCosts.
     */
    cursor?: MaterialCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialCosts.
     */
    distinct?: MaterialCostScalarFieldEnum | MaterialCostScalarFieldEnum[]
  }

  /**
   * MaterialCost findFirstOrThrow
   */
  export type MaterialCostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * Filter, which MaterialCost to fetch.
     */
    where?: MaterialCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialCosts to fetch.
     */
    orderBy?: MaterialCostOrderByWithRelationInput | MaterialCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialCosts.
     */
    cursor?: MaterialCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialCosts.
     */
    distinct?: MaterialCostScalarFieldEnum | MaterialCostScalarFieldEnum[]
  }

  /**
   * MaterialCost findMany
   */
  export type MaterialCostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * Filter, which MaterialCosts to fetch.
     */
    where?: MaterialCostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialCosts to fetch.
     */
    orderBy?: MaterialCostOrderByWithRelationInput | MaterialCostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaterialCosts.
     */
    cursor?: MaterialCostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialCosts.
     */
    skip?: number
    distinct?: MaterialCostScalarFieldEnum | MaterialCostScalarFieldEnum[]
  }

  /**
   * MaterialCost create
   */
  export type MaterialCostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * The data needed to create a MaterialCost.
     */
    data: XOR<MaterialCostCreateInput, MaterialCostUncheckedCreateInput>
  }

  /**
   * MaterialCost createMany
   */
  export type MaterialCostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaterialCosts.
     */
    data: MaterialCostCreateManyInput | MaterialCostCreateManyInput[]
  }

  /**
   * MaterialCost createManyAndReturn
   */
  export type MaterialCostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * The data used to create many MaterialCosts.
     */
    data: MaterialCostCreateManyInput | MaterialCostCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialCost update
   */
  export type MaterialCostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * The data needed to update a MaterialCost.
     */
    data: XOR<MaterialCostUpdateInput, MaterialCostUncheckedUpdateInput>
    /**
     * Choose, which MaterialCost to update.
     */
    where: MaterialCostWhereUniqueInput
  }

  /**
   * MaterialCost updateMany
   */
  export type MaterialCostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaterialCosts.
     */
    data: XOR<MaterialCostUpdateManyMutationInput, MaterialCostUncheckedUpdateManyInput>
    /**
     * Filter which MaterialCosts to update
     */
    where?: MaterialCostWhereInput
    /**
     * Limit how many MaterialCosts to update.
     */
    limit?: number
  }

  /**
   * MaterialCost updateManyAndReturn
   */
  export type MaterialCostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * The data used to update MaterialCosts.
     */
    data: XOR<MaterialCostUpdateManyMutationInput, MaterialCostUncheckedUpdateManyInput>
    /**
     * Filter which MaterialCosts to update
     */
    where?: MaterialCostWhereInput
    /**
     * Limit how many MaterialCosts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialCost upsert
   */
  export type MaterialCostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * The filter to search for the MaterialCost to update in case it exists.
     */
    where: MaterialCostWhereUniqueInput
    /**
     * In case the MaterialCost found by the `where` argument doesn't exist, create a new MaterialCost with this data.
     */
    create: XOR<MaterialCostCreateInput, MaterialCostUncheckedCreateInput>
    /**
     * In case the MaterialCost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialCostUpdateInput, MaterialCostUncheckedUpdateInput>
  }

  /**
   * MaterialCost delete
   */
  export type MaterialCostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    /**
     * Filter which MaterialCost to delete.
     */
    where: MaterialCostWhereUniqueInput
  }

  /**
   * MaterialCost deleteMany
   */
  export type MaterialCostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialCosts to delete
     */
    where?: MaterialCostWhereInput
    /**
     * Limit how many MaterialCosts to delete.
     */
    limit?: number
  }

  /**
   * MaterialCost.invoice
   */
  export type MaterialCost$invoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    where?: SupplierInvoiceWhereInput
  }

  /**
   * MaterialCost without action
   */
  export type MaterialCostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
  }


  /**
   * Model SupplierInvoice
   */

  export type AggregateSupplierInvoice = {
    _count: SupplierInvoiceCountAggregateOutputType | null
    _avg: SupplierInvoiceAvgAggregateOutputType | null
    _sum: SupplierInvoiceSumAggregateOutputType | null
    _min: SupplierInvoiceMinAggregateOutputType | null
    _max: SupplierInvoiceMaxAggregateOutputType | null
  }

  export type SupplierInvoiceAvgAggregateOutputType = {
    totalAmount: number | null
    taxAmount: number | null
    netAmount: number | null
  }

  export type SupplierInvoiceSumAggregateOutputType = {
    totalAmount: number | null
    taxAmount: number | null
    netAmount: number | null
  }

  export type SupplierInvoiceMinAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    supplier: string | null
    totalAmount: number | null
    taxAmount: number | null
    netAmount: number | null
    currency: string | null
    invoiceDate: Date | null
    dueDate: Date | null
    status: string | null
    uploadedFileUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierInvoiceMaxAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    supplier: string | null
    totalAmount: number | null
    taxAmount: number | null
    netAmount: number | null
    currency: string | null
    invoiceDate: Date | null
    dueDate: Date | null
    status: string | null
    uploadedFileUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierInvoiceCountAggregateOutputType = {
    id: number
    invoiceNumber: number
    supplier: number
    totalAmount: number
    taxAmount: number
    netAmount: number
    currency: number
    invoiceDate: number
    dueDate: number
    status: number
    uploadedFileUrl: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplierInvoiceAvgAggregateInputType = {
    totalAmount?: true
    taxAmount?: true
    netAmount?: true
  }

  export type SupplierInvoiceSumAggregateInputType = {
    totalAmount?: true
    taxAmount?: true
    netAmount?: true
  }

  export type SupplierInvoiceMinAggregateInputType = {
    id?: true
    invoiceNumber?: true
    supplier?: true
    totalAmount?: true
    taxAmount?: true
    netAmount?: true
    currency?: true
    invoiceDate?: true
    dueDate?: true
    status?: true
    uploadedFileUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierInvoiceMaxAggregateInputType = {
    id?: true
    invoiceNumber?: true
    supplier?: true
    totalAmount?: true
    taxAmount?: true
    netAmount?: true
    currency?: true
    invoiceDate?: true
    dueDate?: true
    status?: true
    uploadedFileUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierInvoiceCountAggregateInputType = {
    id?: true
    invoiceNumber?: true
    supplier?: true
    totalAmount?: true
    taxAmount?: true
    netAmount?: true
    currency?: true
    invoiceDate?: true
    dueDate?: true
    status?: true
    uploadedFileUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplierInvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplierInvoice to aggregate.
     */
    where?: SupplierInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplierInvoices to fetch.
     */
    orderBy?: SupplierInvoiceOrderByWithRelationInput | SupplierInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplierInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplierInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupplierInvoices
    **/
    _count?: true | SupplierInvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplierInvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplierInvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierInvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierInvoiceMaxAggregateInputType
  }

  export type GetSupplierInvoiceAggregateType<T extends SupplierInvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplierInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplierInvoice[P]>
      : GetScalarType<T[P], AggregateSupplierInvoice[P]>
  }




  export type SupplierInvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierInvoiceWhereInput
    orderBy?: SupplierInvoiceOrderByWithAggregationInput | SupplierInvoiceOrderByWithAggregationInput[]
    by: SupplierInvoiceScalarFieldEnum[] | SupplierInvoiceScalarFieldEnum
    having?: SupplierInvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierInvoiceCountAggregateInputType | true
    _avg?: SupplierInvoiceAvgAggregateInputType
    _sum?: SupplierInvoiceSumAggregateInputType
    _min?: SupplierInvoiceMinAggregateInputType
    _max?: SupplierInvoiceMaxAggregateInputType
  }

  export type SupplierInvoiceGroupByOutputType = {
    id: string
    invoiceNumber: string
    supplier: string
    totalAmount: number
    taxAmount: number
    netAmount: number
    currency: string
    invoiceDate: Date
    dueDate: Date | null
    status: string
    uploadedFileUrl: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: SupplierInvoiceCountAggregateOutputType | null
    _avg: SupplierInvoiceAvgAggregateOutputType | null
    _sum: SupplierInvoiceSumAggregateOutputType | null
    _min: SupplierInvoiceMinAggregateOutputType | null
    _max: SupplierInvoiceMaxAggregateOutputType | null
  }

  type GetSupplierInvoiceGroupByPayload<T extends SupplierInvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierInvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierInvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierInvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierInvoiceGroupByOutputType[P]>
        }
      >
    >


  export type SupplierInvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    supplier?: boolean
    totalAmount?: boolean
    taxAmount?: boolean
    netAmount?: boolean
    currency?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    status?: boolean
    uploadedFileUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    materialCosts?: boolean | SupplierInvoice$materialCostsArgs<ExtArgs>
    _count?: boolean | SupplierInvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplierInvoice"]>

  export type SupplierInvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    supplier?: boolean
    totalAmount?: boolean
    taxAmount?: boolean
    netAmount?: boolean
    currency?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    status?: boolean
    uploadedFileUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supplierInvoice"]>

  export type SupplierInvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    supplier?: boolean
    totalAmount?: boolean
    taxAmount?: boolean
    netAmount?: boolean
    currency?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    status?: boolean
    uploadedFileUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supplierInvoice"]>

  export type SupplierInvoiceSelectScalar = {
    id?: boolean
    invoiceNumber?: boolean
    supplier?: boolean
    totalAmount?: boolean
    taxAmount?: boolean
    netAmount?: boolean
    currency?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    status?: boolean
    uploadedFileUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplierInvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceNumber" | "supplier" | "totalAmount" | "taxAmount" | "netAmount" | "currency" | "invoiceDate" | "dueDate" | "status" | "uploadedFileUrl" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["supplierInvoice"]>
  export type SupplierInvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    materialCosts?: boolean | SupplierInvoice$materialCostsArgs<ExtArgs>
    _count?: boolean | SupplierInvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupplierInvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SupplierInvoiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SupplierInvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupplierInvoice"
    objects: {
      materialCosts: Prisma.$MaterialCostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceNumber: string
      supplier: string
      totalAmount: number
      taxAmount: number
      netAmount: number
      currency: string
      invoiceDate: Date
      dueDate: Date | null
      status: string
      uploadedFileUrl: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplierInvoice"]>
    composites: {}
  }

  type SupplierInvoiceGetPayload<S extends boolean | null | undefined | SupplierInvoiceDefaultArgs> = $Result.GetResult<Prisma.$SupplierInvoicePayload, S>

  type SupplierInvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupplierInvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupplierInvoiceCountAggregateInputType | true
    }

  export interface SupplierInvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupplierInvoice'], meta: { name: 'SupplierInvoice' } }
    /**
     * Find zero or one SupplierInvoice that matches the filter.
     * @param {SupplierInvoiceFindUniqueArgs} args - Arguments to find a SupplierInvoice
     * @example
     * // Get one SupplierInvoice
     * const supplierInvoice = await prisma.supplierInvoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierInvoiceFindUniqueArgs>(args: SelectSubset<T, SupplierInvoiceFindUniqueArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupplierInvoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupplierInvoiceFindUniqueOrThrowArgs} args - Arguments to find a SupplierInvoice
     * @example
     * // Get one SupplierInvoice
     * const supplierInvoice = await prisma.supplierInvoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierInvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierInvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupplierInvoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierInvoiceFindFirstArgs} args - Arguments to find a SupplierInvoice
     * @example
     * // Get one SupplierInvoice
     * const supplierInvoice = await prisma.supplierInvoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierInvoiceFindFirstArgs>(args?: SelectSubset<T, SupplierInvoiceFindFirstArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupplierInvoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierInvoiceFindFirstOrThrowArgs} args - Arguments to find a SupplierInvoice
     * @example
     * // Get one SupplierInvoice
     * const supplierInvoice = await prisma.supplierInvoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierInvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierInvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupplierInvoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierInvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupplierInvoices
     * const supplierInvoices = await prisma.supplierInvoice.findMany()
     * 
     * // Get first 10 SupplierInvoices
     * const supplierInvoices = await prisma.supplierInvoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierInvoiceWithIdOnly = await prisma.supplierInvoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierInvoiceFindManyArgs>(args?: SelectSubset<T, SupplierInvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupplierInvoice.
     * @param {SupplierInvoiceCreateArgs} args - Arguments to create a SupplierInvoice.
     * @example
     * // Create one SupplierInvoice
     * const SupplierInvoice = await prisma.supplierInvoice.create({
     *   data: {
     *     // ... data to create a SupplierInvoice
     *   }
     * })
     * 
     */
    create<T extends SupplierInvoiceCreateArgs>(args: SelectSubset<T, SupplierInvoiceCreateArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupplierInvoices.
     * @param {SupplierInvoiceCreateManyArgs} args - Arguments to create many SupplierInvoices.
     * @example
     * // Create many SupplierInvoices
     * const supplierInvoice = await prisma.supplierInvoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierInvoiceCreateManyArgs>(args?: SelectSubset<T, SupplierInvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupplierInvoices and returns the data saved in the database.
     * @param {SupplierInvoiceCreateManyAndReturnArgs} args - Arguments to create many SupplierInvoices.
     * @example
     * // Create many SupplierInvoices
     * const supplierInvoice = await prisma.supplierInvoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupplierInvoices and only return the `id`
     * const supplierInvoiceWithIdOnly = await prisma.supplierInvoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplierInvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplierInvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupplierInvoice.
     * @param {SupplierInvoiceDeleteArgs} args - Arguments to delete one SupplierInvoice.
     * @example
     * // Delete one SupplierInvoice
     * const SupplierInvoice = await prisma.supplierInvoice.delete({
     *   where: {
     *     // ... filter to delete one SupplierInvoice
     *   }
     * })
     * 
     */
    delete<T extends SupplierInvoiceDeleteArgs>(args: SelectSubset<T, SupplierInvoiceDeleteArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupplierInvoice.
     * @param {SupplierInvoiceUpdateArgs} args - Arguments to update one SupplierInvoice.
     * @example
     * // Update one SupplierInvoice
     * const supplierInvoice = await prisma.supplierInvoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierInvoiceUpdateArgs>(args: SelectSubset<T, SupplierInvoiceUpdateArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupplierInvoices.
     * @param {SupplierInvoiceDeleteManyArgs} args - Arguments to filter SupplierInvoices to delete.
     * @example
     * // Delete a few SupplierInvoices
     * const { count } = await prisma.supplierInvoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierInvoiceDeleteManyArgs>(args?: SelectSubset<T, SupplierInvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupplierInvoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierInvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupplierInvoices
     * const supplierInvoice = await prisma.supplierInvoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierInvoiceUpdateManyArgs>(args: SelectSubset<T, SupplierInvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupplierInvoices and returns the data updated in the database.
     * @param {SupplierInvoiceUpdateManyAndReturnArgs} args - Arguments to update many SupplierInvoices.
     * @example
     * // Update many SupplierInvoices
     * const supplierInvoice = await prisma.supplierInvoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupplierInvoices and only return the `id`
     * const supplierInvoiceWithIdOnly = await prisma.supplierInvoice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SupplierInvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, SupplierInvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupplierInvoice.
     * @param {SupplierInvoiceUpsertArgs} args - Arguments to update or create a SupplierInvoice.
     * @example
     * // Update or create a SupplierInvoice
     * const supplierInvoice = await prisma.supplierInvoice.upsert({
     *   create: {
     *     // ... data to create a SupplierInvoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupplierInvoice we want to update
     *   }
     * })
     */
    upsert<T extends SupplierInvoiceUpsertArgs>(args: SelectSubset<T, SupplierInvoiceUpsertArgs<ExtArgs>>): Prisma__SupplierInvoiceClient<$Result.GetResult<Prisma.$SupplierInvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupplierInvoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierInvoiceCountArgs} args - Arguments to filter SupplierInvoices to count.
     * @example
     * // Count the number of SupplierInvoices
     * const count = await prisma.supplierInvoice.count({
     *   where: {
     *     // ... the filter for the SupplierInvoices we want to count
     *   }
     * })
    **/
    count<T extends SupplierInvoiceCountArgs>(
      args?: Subset<T, SupplierInvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierInvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupplierInvoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierInvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplierInvoiceAggregateArgs>(args: Subset<T, SupplierInvoiceAggregateArgs>): Prisma.PrismaPromise<GetSupplierInvoiceAggregateType<T>>

    /**
     * Group by SupplierInvoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierInvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplierInvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierInvoiceGroupByArgs['orderBy'] }
        : { orderBy?: SupplierInvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplierInvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupplierInvoice model
   */
  readonly fields: SupplierInvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupplierInvoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierInvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    materialCosts<T extends SupplierInvoice$materialCostsArgs<ExtArgs> = {}>(args?: Subset<T, SupplierInvoice$materialCostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialCostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupplierInvoice model
   */
  interface SupplierInvoiceFieldRefs {
    readonly id: FieldRef<"SupplierInvoice", 'String'>
    readonly invoiceNumber: FieldRef<"SupplierInvoice", 'String'>
    readonly supplier: FieldRef<"SupplierInvoice", 'String'>
    readonly totalAmount: FieldRef<"SupplierInvoice", 'Float'>
    readonly taxAmount: FieldRef<"SupplierInvoice", 'Float'>
    readonly netAmount: FieldRef<"SupplierInvoice", 'Float'>
    readonly currency: FieldRef<"SupplierInvoice", 'String'>
    readonly invoiceDate: FieldRef<"SupplierInvoice", 'DateTime'>
    readonly dueDate: FieldRef<"SupplierInvoice", 'DateTime'>
    readonly status: FieldRef<"SupplierInvoice", 'String'>
    readonly uploadedFileUrl: FieldRef<"SupplierInvoice", 'String'>
    readonly notes: FieldRef<"SupplierInvoice", 'String'>
    readonly createdAt: FieldRef<"SupplierInvoice", 'DateTime'>
    readonly updatedAt: FieldRef<"SupplierInvoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupplierInvoice findUnique
   */
  export type SupplierInvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierInvoice to fetch.
     */
    where: SupplierInvoiceWhereUniqueInput
  }

  /**
   * SupplierInvoice findUniqueOrThrow
   */
  export type SupplierInvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierInvoice to fetch.
     */
    where: SupplierInvoiceWhereUniqueInput
  }

  /**
   * SupplierInvoice findFirst
   */
  export type SupplierInvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierInvoice to fetch.
     */
    where?: SupplierInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplierInvoices to fetch.
     */
    orderBy?: SupplierInvoiceOrderByWithRelationInput | SupplierInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplierInvoices.
     */
    cursor?: SupplierInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplierInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplierInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplierInvoices.
     */
    distinct?: SupplierInvoiceScalarFieldEnum | SupplierInvoiceScalarFieldEnum[]
  }

  /**
   * SupplierInvoice findFirstOrThrow
   */
  export type SupplierInvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierInvoice to fetch.
     */
    where?: SupplierInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplierInvoices to fetch.
     */
    orderBy?: SupplierInvoiceOrderByWithRelationInput | SupplierInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplierInvoices.
     */
    cursor?: SupplierInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplierInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplierInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplierInvoices.
     */
    distinct?: SupplierInvoiceScalarFieldEnum | SupplierInvoiceScalarFieldEnum[]
  }

  /**
   * SupplierInvoice findMany
   */
  export type SupplierInvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierInvoices to fetch.
     */
    where?: SupplierInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplierInvoices to fetch.
     */
    orderBy?: SupplierInvoiceOrderByWithRelationInput | SupplierInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupplierInvoices.
     */
    cursor?: SupplierInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplierInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplierInvoices.
     */
    skip?: number
    distinct?: SupplierInvoiceScalarFieldEnum | SupplierInvoiceScalarFieldEnum[]
  }

  /**
   * SupplierInvoice create
   */
  export type SupplierInvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a SupplierInvoice.
     */
    data: XOR<SupplierInvoiceCreateInput, SupplierInvoiceUncheckedCreateInput>
  }

  /**
   * SupplierInvoice createMany
   */
  export type SupplierInvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupplierInvoices.
     */
    data: SupplierInvoiceCreateManyInput | SupplierInvoiceCreateManyInput[]
  }

  /**
   * SupplierInvoice createManyAndReturn
   */
  export type SupplierInvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many SupplierInvoices.
     */
    data: SupplierInvoiceCreateManyInput | SupplierInvoiceCreateManyInput[]
  }

  /**
   * SupplierInvoice update
   */
  export type SupplierInvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a SupplierInvoice.
     */
    data: XOR<SupplierInvoiceUpdateInput, SupplierInvoiceUncheckedUpdateInput>
    /**
     * Choose, which SupplierInvoice to update.
     */
    where: SupplierInvoiceWhereUniqueInput
  }

  /**
   * SupplierInvoice updateMany
   */
  export type SupplierInvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupplierInvoices.
     */
    data: XOR<SupplierInvoiceUpdateManyMutationInput, SupplierInvoiceUncheckedUpdateManyInput>
    /**
     * Filter which SupplierInvoices to update
     */
    where?: SupplierInvoiceWhereInput
    /**
     * Limit how many SupplierInvoices to update.
     */
    limit?: number
  }

  /**
   * SupplierInvoice updateManyAndReturn
   */
  export type SupplierInvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * The data used to update SupplierInvoices.
     */
    data: XOR<SupplierInvoiceUpdateManyMutationInput, SupplierInvoiceUncheckedUpdateManyInput>
    /**
     * Filter which SupplierInvoices to update
     */
    where?: SupplierInvoiceWhereInput
    /**
     * Limit how many SupplierInvoices to update.
     */
    limit?: number
  }

  /**
   * SupplierInvoice upsert
   */
  export type SupplierInvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the SupplierInvoice to update in case it exists.
     */
    where: SupplierInvoiceWhereUniqueInput
    /**
     * In case the SupplierInvoice found by the `where` argument doesn't exist, create a new SupplierInvoice with this data.
     */
    create: XOR<SupplierInvoiceCreateInput, SupplierInvoiceUncheckedCreateInput>
    /**
     * In case the SupplierInvoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierInvoiceUpdateInput, SupplierInvoiceUncheckedUpdateInput>
  }

  /**
   * SupplierInvoice delete
   */
  export type SupplierInvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
    /**
     * Filter which SupplierInvoice to delete.
     */
    where: SupplierInvoiceWhereUniqueInput
  }

  /**
   * SupplierInvoice deleteMany
   */
  export type SupplierInvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplierInvoices to delete
     */
    where?: SupplierInvoiceWhereInput
    /**
     * Limit how many SupplierInvoices to delete.
     */
    limit?: number
  }

  /**
   * SupplierInvoice.materialCosts
   */
  export type SupplierInvoice$materialCostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCost
     */
    select?: MaterialCostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialCost
     */
    omit?: MaterialCostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialCostInclude<ExtArgs> | null
    where?: MaterialCostWhereInput
    orderBy?: MaterialCostOrderByWithRelationInput | MaterialCostOrderByWithRelationInput[]
    cursor?: MaterialCostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaterialCostScalarFieldEnum | MaterialCostScalarFieldEnum[]
  }

  /**
   * SupplierInvoice without action
   */
  export type SupplierInvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierInvoice
     */
    select?: SupplierInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierInvoice
     */
    omit?: SupplierInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInvoiceInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type DocumentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    filename: string | null
    originalName: string | null
    fileType: string | null
    fileSize: number | null
    fileUrl: string | null
    uploadedAt: Date | null
    isPublic: boolean | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    filename: string | null
    originalName: string | null
    fileType: string | null
    fileSize: number | null
    fileUrl: string | null
    uploadedAt: Date | null
    isPublic: boolean | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    projectId: number
    filename: number
    originalName: number
    fileType: number
    fileSize: number
    fileUrl: number
    uploadedAt: number
    isPublic: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    fileSize?: true
  }

  export type DocumentSumAggregateInputType = {
    fileSize?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    projectId?: true
    filename?: true
    originalName?: true
    fileType?: true
    fileSize?: true
    fileUrl?: true
    uploadedAt?: true
    isPublic?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    projectId?: true
    filename?: true
    originalName?: true
    fileType?: true
    fileSize?: true
    fileUrl?: true
    uploadedAt?: true
    isPublic?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    projectId?: true
    filename?: true
    originalName?: true
    fileType?: true
    fileSize?: true
    fileUrl?: true
    uploadedAt?: true
    isPublic?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    projectId: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl: string | null
    uploadedAt: Date
    isPublic: boolean
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    filename?: boolean
    originalName?: boolean
    fileType?: boolean
    fileSize?: boolean
    fileUrl?: boolean
    uploadedAt?: boolean
    isPublic?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    generations?: boolean | Document$generationsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    filename?: boolean
    originalName?: boolean
    fileType?: boolean
    fileSize?: boolean
    fileUrl?: boolean
    uploadedAt?: boolean
    isPublic?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    filename?: boolean
    originalName?: boolean
    fileType?: boolean
    fileSize?: boolean
    fileUrl?: boolean
    uploadedAt?: boolean
    isPublic?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    projectId?: boolean
    filename?: boolean
    originalName?: boolean
    fileType?: boolean
    fileSize?: boolean
    fileUrl?: boolean
    uploadedAt?: boolean
    isPublic?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "filename" | "originalName" | "fileType" | "fileSize" | "fileUrl" | "uploadedAt" | "isPublic", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    generations?: boolean | Document$generationsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      generations: Prisma.$DocumentGenerationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      filename: string
      originalName: string
      fileType: string
      fileSize: number
      fileUrl: string | null
      uploadedAt: Date
      isPublic: boolean
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    generations<T extends Document$generationsArgs<ExtArgs> = {}>(args?: Subset<T, Document$generationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly projectId: FieldRef<"Document", 'String'>
    readonly filename: FieldRef<"Document", 'String'>
    readonly originalName: FieldRef<"Document", 'String'>
    readonly fileType: FieldRef<"Document", 'String'>
    readonly fileSize: FieldRef<"Document", 'Int'>
    readonly fileUrl: FieldRef<"Document", 'String'>
    readonly uploadedAt: FieldRef<"Document", 'DateTime'>
    readonly isPublic: FieldRef<"Document", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.generations
   */
  export type Document$generationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    where?: DocumentGenerationWhereInput
    orderBy?: DocumentGenerationOrderByWithRelationInput | DocumentGenerationOrderByWithRelationInput[]
    cursor?: DocumentGenerationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentGenerationScalarFieldEnum | DocumentGenerationScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentGeneration
   */

  export type AggregateDocumentGeneration = {
    _count: DocumentGenerationCountAggregateOutputType | null
    _min: DocumentGenerationMinAggregateOutputType | null
    _max: DocumentGenerationMaxAggregateOutputType | null
  }

  export type DocumentGenerationMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    documentType: string | null
    documentNumber: string | null
    templateData: string | null
    status: string | null
    generatedBy: string | null
    autoSend: boolean | null
    recipientEmail: string | null
    emailSent: boolean | null
    emailSentAt: Date | null
    fileUrl: string | null
    generatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentGenerationMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    documentType: string | null
    documentNumber: string | null
    templateData: string | null
    status: string | null
    generatedBy: string | null
    autoSend: boolean | null
    recipientEmail: string | null
    emailSent: boolean | null
    emailSentAt: Date | null
    fileUrl: string | null
    generatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentGenerationCountAggregateOutputType = {
    id: number
    documentId: number
    documentType: number
    documentNumber: number
    templateData: number
    status: number
    generatedBy: number
    autoSend: number
    recipientEmail: number
    emailSent: number
    emailSentAt: number
    fileUrl: number
    generatedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentGenerationMinAggregateInputType = {
    id?: true
    documentId?: true
    documentType?: true
    documentNumber?: true
    templateData?: true
    status?: true
    generatedBy?: true
    autoSend?: true
    recipientEmail?: true
    emailSent?: true
    emailSentAt?: true
    fileUrl?: true
    generatedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentGenerationMaxAggregateInputType = {
    id?: true
    documentId?: true
    documentType?: true
    documentNumber?: true
    templateData?: true
    status?: true
    generatedBy?: true
    autoSend?: true
    recipientEmail?: true
    emailSent?: true
    emailSentAt?: true
    fileUrl?: true
    generatedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentGenerationCountAggregateInputType = {
    id?: true
    documentId?: true
    documentType?: true
    documentNumber?: true
    templateData?: true
    status?: true
    generatedBy?: true
    autoSend?: true
    recipientEmail?: true
    emailSent?: true
    emailSentAt?: true
    fileUrl?: true
    generatedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentGenerationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentGeneration to aggregate.
     */
    where?: DocumentGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentGenerations to fetch.
     */
    orderBy?: DocumentGenerationOrderByWithRelationInput | DocumentGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentGenerations
    **/
    _count?: true | DocumentGenerationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentGenerationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentGenerationMaxAggregateInputType
  }

  export type GetDocumentGenerationAggregateType<T extends DocumentGenerationAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentGeneration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentGeneration[P]>
      : GetScalarType<T[P], AggregateDocumentGeneration[P]>
  }




  export type DocumentGenerationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentGenerationWhereInput
    orderBy?: DocumentGenerationOrderByWithAggregationInput | DocumentGenerationOrderByWithAggregationInput[]
    by: DocumentGenerationScalarFieldEnum[] | DocumentGenerationScalarFieldEnum
    having?: DocumentGenerationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentGenerationCountAggregateInputType | true
    _min?: DocumentGenerationMinAggregateInputType
    _max?: DocumentGenerationMaxAggregateInputType
  }

  export type DocumentGenerationGroupByOutputType = {
    id: string
    documentId: string
    documentType: string
    documentNumber: string
    templateData: string
    status: string
    generatedBy: string | null
    autoSend: boolean
    recipientEmail: string | null
    emailSent: boolean
    emailSentAt: Date | null
    fileUrl: string | null
    generatedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DocumentGenerationCountAggregateOutputType | null
    _min: DocumentGenerationMinAggregateOutputType | null
    _max: DocumentGenerationMaxAggregateOutputType | null
  }

  type GetDocumentGenerationGroupByPayload<T extends DocumentGenerationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGenerationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGenerationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGenerationGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGenerationGroupByOutputType[P]>
        }
      >
    >


  export type DocumentGenerationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    templateData?: boolean
    status?: boolean
    generatedBy?: boolean
    autoSend?: boolean
    recipientEmail?: boolean
    emailSent?: boolean
    emailSentAt?: boolean
    fileUrl?: boolean
    generatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentGeneration"]>

  export type DocumentGenerationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    templateData?: boolean
    status?: boolean
    generatedBy?: boolean
    autoSend?: boolean
    recipientEmail?: boolean
    emailSent?: boolean
    emailSentAt?: boolean
    fileUrl?: boolean
    generatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentGeneration"]>

  export type DocumentGenerationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    templateData?: boolean
    status?: boolean
    generatedBy?: boolean
    autoSend?: boolean
    recipientEmail?: boolean
    emailSent?: boolean
    emailSentAt?: boolean
    fileUrl?: boolean
    generatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentGeneration"]>

  export type DocumentGenerationSelectScalar = {
    id?: boolean
    documentId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    templateData?: boolean
    status?: boolean
    generatedBy?: boolean
    autoSend?: boolean
    recipientEmail?: boolean
    emailSent?: boolean
    emailSentAt?: boolean
    fileUrl?: boolean
    generatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentGenerationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "documentType" | "documentNumber" | "templateData" | "status" | "generatedBy" | "autoSend" | "recipientEmail" | "emailSent" | "emailSentAt" | "fileUrl" | "generatedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["documentGeneration"]>
  export type DocumentGenerationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DocumentGenerationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DocumentGenerationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $DocumentGenerationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentGeneration"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      documentType: string
      documentNumber: string
      templateData: string
      status: string
      generatedBy: string | null
      autoSend: boolean
      recipientEmail: string | null
      emailSent: boolean
      emailSentAt: Date | null
      fileUrl: string | null
      generatedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["documentGeneration"]>
    composites: {}
  }

  type DocumentGenerationGetPayload<S extends boolean | null | undefined | DocumentGenerationDefaultArgs> = $Result.GetResult<Prisma.$DocumentGenerationPayload, S>

  type DocumentGenerationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentGenerationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentGenerationCountAggregateInputType | true
    }

  export interface DocumentGenerationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentGeneration'], meta: { name: 'DocumentGeneration' } }
    /**
     * Find zero or one DocumentGeneration that matches the filter.
     * @param {DocumentGenerationFindUniqueArgs} args - Arguments to find a DocumentGeneration
     * @example
     * // Get one DocumentGeneration
     * const documentGeneration = await prisma.documentGeneration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentGenerationFindUniqueArgs>(args: SelectSubset<T, DocumentGenerationFindUniqueArgs<ExtArgs>>): Prisma__DocumentGenerationClient<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentGeneration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentGenerationFindUniqueOrThrowArgs} args - Arguments to find a DocumentGeneration
     * @example
     * // Get one DocumentGeneration
     * const documentGeneration = await prisma.documentGeneration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentGenerationFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentGenerationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentGenerationClient<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentGeneration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGenerationFindFirstArgs} args - Arguments to find a DocumentGeneration
     * @example
     * // Get one DocumentGeneration
     * const documentGeneration = await prisma.documentGeneration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentGenerationFindFirstArgs>(args?: SelectSubset<T, DocumentGenerationFindFirstArgs<ExtArgs>>): Prisma__DocumentGenerationClient<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentGeneration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGenerationFindFirstOrThrowArgs} args - Arguments to find a DocumentGeneration
     * @example
     * // Get one DocumentGeneration
     * const documentGeneration = await prisma.documentGeneration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentGenerationFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentGenerationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentGenerationClient<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentGenerations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGenerationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentGenerations
     * const documentGenerations = await prisma.documentGeneration.findMany()
     * 
     * // Get first 10 DocumentGenerations
     * const documentGenerations = await prisma.documentGeneration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentGenerationWithIdOnly = await prisma.documentGeneration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentGenerationFindManyArgs>(args?: SelectSubset<T, DocumentGenerationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentGeneration.
     * @param {DocumentGenerationCreateArgs} args - Arguments to create a DocumentGeneration.
     * @example
     * // Create one DocumentGeneration
     * const DocumentGeneration = await prisma.documentGeneration.create({
     *   data: {
     *     // ... data to create a DocumentGeneration
     *   }
     * })
     * 
     */
    create<T extends DocumentGenerationCreateArgs>(args: SelectSubset<T, DocumentGenerationCreateArgs<ExtArgs>>): Prisma__DocumentGenerationClient<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentGenerations.
     * @param {DocumentGenerationCreateManyArgs} args - Arguments to create many DocumentGenerations.
     * @example
     * // Create many DocumentGenerations
     * const documentGeneration = await prisma.documentGeneration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentGenerationCreateManyArgs>(args?: SelectSubset<T, DocumentGenerationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentGenerations and returns the data saved in the database.
     * @param {DocumentGenerationCreateManyAndReturnArgs} args - Arguments to create many DocumentGenerations.
     * @example
     * // Create many DocumentGenerations
     * const documentGeneration = await prisma.documentGeneration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentGenerations and only return the `id`
     * const documentGenerationWithIdOnly = await prisma.documentGeneration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentGenerationCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentGenerationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentGeneration.
     * @param {DocumentGenerationDeleteArgs} args - Arguments to delete one DocumentGeneration.
     * @example
     * // Delete one DocumentGeneration
     * const DocumentGeneration = await prisma.documentGeneration.delete({
     *   where: {
     *     // ... filter to delete one DocumentGeneration
     *   }
     * })
     * 
     */
    delete<T extends DocumentGenerationDeleteArgs>(args: SelectSubset<T, DocumentGenerationDeleteArgs<ExtArgs>>): Prisma__DocumentGenerationClient<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentGeneration.
     * @param {DocumentGenerationUpdateArgs} args - Arguments to update one DocumentGeneration.
     * @example
     * // Update one DocumentGeneration
     * const documentGeneration = await prisma.documentGeneration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentGenerationUpdateArgs>(args: SelectSubset<T, DocumentGenerationUpdateArgs<ExtArgs>>): Prisma__DocumentGenerationClient<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentGenerations.
     * @param {DocumentGenerationDeleteManyArgs} args - Arguments to filter DocumentGenerations to delete.
     * @example
     * // Delete a few DocumentGenerations
     * const { count } = await prisma.documentGeneration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentGenerationDeleteManyArgs>(args?: SelectSubset<T, DocumentGenerationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentGenerations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGenerationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentGenerations
     * const documentGeneration = await prisma.documentGeneration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentGenerationUpdateManyArgs>(args: SelectSubset<T, DocumentGenerationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentGenerations and returns the data updated in the database.
     * @param {DocumentGenerationUpdateManyAndReturnArgs} args - Arguments to update many DocumentGenerations.
     * @example
     * // Update many DocumentGenerations
     * const documentGeneration = await prisma.documentGeneration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentGenerations and only return the `id`
     * const documentGenerationWithIdOnly = await prisma.documentGeneration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentGenerationUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentGenerationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentGeneration.
     * @param {DocumentGenerationUpsertArgs} args - Arguments to update or create a DocumentGeneration.
     * @example
     * // Update or create a DocumentGeneration
     * const documentGeneration = await prisma.documentGeneration.upsert({
     *   create: {
     *     // ... data to create a DocumentGeneration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentGeneration we want to update
     *   }
     * })
     */
    upsert<T extends DocumentGenerationUpsertArgs>(args: SelectSubset<T, DocumentGenerationUpsertArgs<ExtArgs>>): Prisma__DocumentGenerationClient<$Result.GetResult<Prisma.$DocumentGenerationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentGenerations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGenerationCountArgs} args - Arguments to filter DocumentGenerations to count.
     * @example
     * // Count the number of DocumentGenerations
     * const count = await prisma.documentGeneration.count({
     *   where: {
     *     // ... the filter for the DocumentGenerations we want to count
     *   }
     * })
    **/
    count<T extends DocumentGenerationCountArgs>(
      args?: Subset<T, DocumentGenerationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentGenerationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentGeneration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGenerationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentGenerationAggregateArgs>(args: Subset<T, DocumentGenerationAggregateArgs>): Prisma.PrismaPromise<GetDocumentGenerationAggregateType<T>>

    /**
     * Group by DocumentGeneration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGenerationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGenerationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGenerationGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGenerationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGenerationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGenerationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentGeneration model
   */
  readonly fields: DocumentGenerationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentGeneration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentGenerationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentGeneration model
   */
  interface DocumentGenerationFieldRefs {
    readonly id: FieldRef<"DocumentGeneration", 'String'>
    readonly documentId: FieldRef<"DocumentGeneration", 'String'>
    readonly documentType: FieldRef<"DocumentGeneration", 'String'>
    readonly documentNumber: FieldRef<"DocumentGeneration", 'String'>
    readonly templateData: FieldRef<"DocumentGeneration", 'String'>
    readonly status: FieldRef<"DocumentGeneration", 'String'>
    readonly generatedBy: FieldRef<"DocumentGeneration", 'String'>
    readonly autoSend: FieldRef<"DocumentGeneration", 'Boolean'>
    readonly recipientEmail: FieldRef<"DocumentGeneration", 'String'>
    readonly emailSent: FieldRef<"DocumentGeneration", 'Boolean'>
    readonly emailSentAt: FieldRef<"DocumentGeneration", 'DateTime'>
    readonly fileUrl: FieldRef<"DocumentGeneration", 'String'>
    readonly generatedAt: FieldRef<"DocumentGeneration", 'DateTime'>
    readonly createdAt: FieldRef<"DocumentGeneration", 'DateTime'>
    readonly updatedAt: FieldRef<"DocumentGeneration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentGeneration findUnique
   */
  export type DocumentGenerationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * Filter, which DocumentGeneration to fetch.
     */
    where: DocumentGenerationWhereUniqueInput
  }

  /**
   * DocumentGeneration findUniqueOrThrow
   */
  export type DocumentGenerationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * Filter, which DocumentGeneration to fetch.
     */
    where: DocumentGenerationWhereUniqueInput
  }

  /**
   * DocumentGeneration findFirst
   */
  export type DocumentGenerationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * Filter, which DocumentGeneration to fetch.
     */
    where?: DocumentGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentGenerations to fetch.
     */
    orderBy?: DocumentGenerationOrderByWithRelationInput | DocumentGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentGenerations.
     */
    cursor?: DocumentGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentGenerations.
     */
    distinct?: DocumentGenerationScalarFieldEnum | DocumentGenerationScalarFieldEnum[]
  }

  /**
   * DocumentGeneration findFirstOrThrow
   */
  export type DocumentGenerationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * Filter, which DocumentGeneration to fetch.
     */
    where?: DocumentGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentGenerations to fetch.
     */
    orderBy?: DocumentGenerationOrderByWithRelationInput | DocumentGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentGenerations.
     */
    cursor?: DocumentGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentGenerations.
     */
    distinct?: DocumentGenerationScalarFieldEnum | DocumentGenerationScalarFieldEnum[]
  }

  /**
   * DocumentGeneration findMany
   */
  export type DocumentGenerationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * Filter, which DocumentGenerations to fetch.
     */
    where?: DocumentGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentGenerations to fetch.
     */
    orderBy?: DocumentGenerationOrderByWithRelationInput | DocumentGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentGenerations.
     */
    cursor?: DocumentGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentGenerations.
     */
    skip?: number
    distinct?: DocumentGenerationScalarFieldEnum | DocumentGenerationScalarFieldEnum[]
  }

  /**
   * DocumentGeneration create
   */
  export type DocumentGenerationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentGeneration.
     */
    data: XOR<DocumentGenerationCreateInput, DocumentGenerationUncheckedCreateInput>
  }

  /**
   * DocumentGeneration createMany
   */
  export type DocumentGenerationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentGenerations.
     */
    data: DocumentGenerationCreateManyInput | DocumentGenerationCreateManyInput[]
  }

  /**
   * DocumentGeneration createManyAndReturn
   */
  export type DocumentGenerationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentGenerations.
     */
    data: DocumentGenerationCreateManyInput | DocumentGenerationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentGeneration update
   */
  export type DocumentGenerationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentGeneration.
     */
    data: XOR<DocumentGenerationUpdateInput, DocumentGenerationUncheckedUpdateInput>
    /**
     * Choose, which DocumentGeneration to update.
     */
    where: DocumentGenerationWhereUniqueInput
  }

  /**
   * DocumentGeneration updateMany
   */
  export type DocumentGenerationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentGenerations.
     */
    data: XOR<DocumentGenerationUpdateManyMutationInput, DocumentGenerationUncheckedUpdateManyInput>
    /**
     * Filter which DocumentGenerations to update
     */
    where?: DocumentGenerationWhereInput
    /**
     * Limit how many DocumentGenerations to update.
     */
    limit?: number
  }

  /**
   * DocumentGeneration updateManyAndReturn
   */
  export type DocumentGenerationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * The data used to update DocumentGenerations.
     */
    data: XOR<DocumentGenerationUpdateManyMutationInput, DocumentGenerationUncheckedUpdateManyInput>
    /**
     * Filter which DocumentGenerations to update
     */
    where?: DocumentGenerationWhereInput
    /**
     * Limit how many DocumentGenerations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentGeneration upsert
   */
  export type DocumentGenerationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentGeneration to update in case it exists.
     */
    where: DocumentGenerationWhereUniqueInput
    /**
     * In case the DocumentGeneration found by the `where` argument doesn't exist, create a new DocumentGeneration with this data.
     */
    create: XOR<DocumentGenerationCreateInput, DocumentGenerationUncheckedCreateInput>
    /**
     * In case the DocumentGeneration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentGenerationUpdateInput, DocumentGenerationUncheckedUpdateInput>
  }

  /**
   * DocumentGeneration delete
   */
  export type DocumentGenerationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
    /**
     * Filter which DocumentGeneration to delete.
     */
    where: DocumentGenerationWhereUniqueInput
  }

  /**
   * DocumentGeneration deleteMany
   */
  export type DocumentGenerationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentGenerations to delete
     */
    where?: DocumentGenerationWhereInput
    /**
     * Limit how many DocumentGenerations to delete.
     */
    limit?: number
  }

  /**
   * DocumentGeneration without action
   */
  export type DocumentGenerationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentGeneration
     */
    select?: DocumentGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentGeneration
     */
    omit?: DocumentGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentGenerationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    userId: string | null
    content: string | null
    role: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    content: string | null
    role: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    userId: number
    content: number
    role: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    role?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    role?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    userId: string
    content: string
    role: string
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    userId?: boolean
    content?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "content" | "role" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      content: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly userId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model RequirementSubmission
   */

  export type AggregateRequirementSubmission = {
    _count: RequirementSubmissionCountAggregateOutputType | null
    _min: RequirementSubmissionMinAggregateOutputType | null
    _max: RequirementSubmissionMaxAggregateOutputType | null
  }

  export type RequirementSubmissionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    projectType: string | null
    urgency: string | null
    budget: string | null
    requirements: string | null
    createdAt: Date | null
  }

  export type RequirementSubmissionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    projectType: string | null
    urgency: string | null
    budget: string | null
    requirements: string | null
    createdAt: Date | null
  }

  export type RequirementSubmissionCountAggregateOutputType = {
    id: number
    userId: number
    projectType: number
    urgency: number
    budget: number
    requirements: number
    createdAt: number
    _all: number
  }


  export type RequirementSubmissionMinAggregateInputType = {
    id?: true
    userId?: true
    projectType?: true
    urgency?: true
    budget?: true
    requirements?: true
    createdAt?: true
  }

  export type RequirementSubmissionMaxAggregateInputType = {
    id?: true
    userId?: true
    projectType?: true
    urgency?: true
    budget?: true
    requirements?: true
    createdAt?: true
  }

  export type RequirementSubmissionCountAggregateInputType = {
    id?: true
    userId?: true
    projectType?: true
    urgency?: true
    budget?: true
    requirements?: true
    createdAt?: true
    _all?: true
  }

  export type RequirementSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequirementSubmission to aggregate.
     */
    where?: RequirementSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequirementSubmissions to fetch.
     */
    orderBy?: RequirementSubmissionOrderByWithRelationInput | RequirementSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequirementSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequirementSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequirementSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequirementSubmissions
    **/
    _count?: true | RequirementSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequirementSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequirementSubmissionMaxAggregateInputType
  }

  export type GetRequirementSubmissionAggregateType<T extends RequirementSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRequirementSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequirementSubmission[P]>
      : GetScalarType<T[P], AggregateRequirementSubmission[P]>
  }




  export type RequirementSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequirementSubmissionWhereInput
    orderBy?: RequirementSubmissionOrderByWithAggregationInput | RequirementSubmissionOrderByWithAggregationInput[]
    by: RequirementSubmissionScalarFieldEnum[] | RequirementSubmissionScalarFieldEnum
    having?: RequirementSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequirementSubmissionCountAggregateInputType | true
    _min?: RequirementSubmissionMinAggregateInputType
    _max?: RequirementSubmissionMaxAggregateInputType
  }

  export type RequirementSubmissionGroupByOutputType = {
    id: string
    userId: string | null
    projectType: string
    urgency: string
    budget: string
    requirements: string
    createdAt: Date
    _count: RequirementSubmissionCountAggregateOutputType | null
    _min: RequirementSubmissionMinAggregateOutputType | null
    _max: RequirementSubmissionMaxAggregateOutputType | null
  }

  type GetRequirementSubmissionGroupByPayload<T extends RequirementSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequirementSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequirementSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequirementSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], RequirementSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type RequirementSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    projectType?: boolean
    urgency?: boolean
    budget?: boolean
    requirements?: boolean
    createdAt?: boolean
    user?: boolean | RequirementSubmission$userArgs<ExtArgs>
  }, ExtArgs["result"]["requirementSubmission"]>

  export type RequirementSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    projectType?: boolean
    urgency?: boolean
    budget?: boolean
    requirements?: boolean
    createdAt?: boolean
    user?: boolean | RequirementSubmission$userArgs<ExtArgs>
  }, ExtArgs["result"]["requirementSubmission"]>

  export type RequirementSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    projectType?: boolean
    urgency?: boolean
    budget?: boolean
    requirements?: boolean
    createdAt?: boolean
    user?: boolean | RequirementSubmission$userArgs<ExtArgs>
  }, ExtArgs["result"]["requirementSubmission"]>

  export type RequirementSubmissionSelectScalar = {
    id?: boolean
    userId?: boolean
    projectType?: boolean
    urgency?: boolean
    budget?: boolean
    requirements?: boolean
    createdAt?: boolean
  }

  export type RequirementSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "projectType" | "urgency" | "budget" | "requirements" | "createdAt", ExtArgs["result"]["requirementSubmission"]>
  export type RequirementSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | RequirementSubmission$userArgs<ExtArgs>
  }
  export type RequirementSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | RequirementSubmission$userArgs<ExtArgs>
  }
  export type RequirementSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | RequirementSubmission$userArgs<ExtArgs>
  }

  export type $RequirementSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequirementSubmission"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      projectType: string
      urgency: string
      budget: string
      requirements: string
      createdAt: Date
    }, ExtArgs["result"]["requirementSubmission"]>
    composites: {}
  }

  type RequirementSubmissionGetPayload<S extends boolean | null | undefined | RequirementSubmissionDefaultArgs> = $Result.GetResult<Prisma.$RequirementSubmissionPayload, S>

  type RequirementSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequirementSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequirementSubmissionCountAggregateInputType | true
    }

  export interface RequirementSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequirementSubmission'], meta: { name: 'RequirementSubmission' } }
    /**
     * Find zero or one RequirementSubmission that matches the filter.
     * @param {RequirementSubmissionFindUniqueArgs} args - Arguments to find a RequirementSubmission
     * @example
     * // Get one RequirementSubmission
     * const requirementSubmission = await prisma.requirementSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequirementSubmissionFindUniqueArgs>(args: SelectSubset<T, RequirementSubmissionFindUniqueArgs<ExtArgs>>): Prisma__RequirementSubmissionClient<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequirementSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequirementSubmissionFindUniqueOrThrowArgs} args - Arguments to find a RequirementSubmission
     * @example
     * // Get one RequirementSubmission
     * const requirementSubmission = await prisma.requirementSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequirementSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RequirementSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequirementSubmissionClient<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequirementSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequirementSubmissionFindFirstArgs} args - Arguments to find a RequirementSubmission
     * @example
     * // Get one RequirementSubmission
     * const requirementSubmission = await prisma.requirementSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequirementSubmissionFindFirstArgs>(args?: SelectSubset<T, RequirementSubmissionFindFirstArgs<ExtArgs>>): Prisma__RequirementSubmissionClient<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequirementSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequirementSubmissionFindFirstOrThrowArgs} args - Arguments to find a RequirementSubmission
     * @example
     * // Get one RequirementSubmission
     * const requirementSubmission = await prisma.requirementSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequirementSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RequirementSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequirementSubmissionClient<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequirementSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequirementSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequirementSubmissions
     * const requirementSubmissions = await prisma.requirementSubmission.findMany()
     * 
     * // Get first 10 RequirementSubmissions
     * const requirementSubmissions = await prisma.requirementSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requirementSubmissionWithIdOnly = await prisma.requirementSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequirementSubmissionFindManyArgs>(args?: SelectSubset<T, RequirementSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequirementSubmission.
     * @param {RequirementSubmissionCreateArgs} args - Arguments to create a RequirementSubmission.
     * @example
     * // Create one RequirementSubmission
     * const RequirementSubmission = await prisma.requirementSubmission.create({
     *   data: {
     *     // ... data to create a RequirementSubmission
     *   }
     * })
     * 
     */
    create<T extends RequirementSubmissionCreateArgs>(args: SelectSubset<T, RequirementSubmissionCreateArgs<ExtArgs>>): Prisma__RequirementSubmissionClient<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequirementSubmissions.
     * @param {RequirementSubmissionCreateManyArgs} args - Arguments to create many RequirementSubmissions.
     * @example
     * // Create many RequirementSubmissions
     * const requirementSubmission = await prisma.requirementSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequirementSubmissionCreateManyArgs>(args?: SelectSubset<T, RequirementSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequirementSubmissions and returns the data saved in the database.
     * @param {RequirementSubmissionCreateManyAndReturnArgs} args - Arguments to create many RequirementSubmissions.
     * @example
     * // Create many RequirementSubmissions
     * const requirementSubmission = await prisma.requirementSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequirementSubmissions and only return the `id`
     * const requirementSubmissionWithIdOnly = await prisma.requirementSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequirementSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, RequirementSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequirementSubmission.
     * @param {RequirementSubmissionDeleteArgs} args - Arguments to delete one RequirementSubmission.
     * @example
     * // Delete one RequirementSubmission
     * const RequirementSubmission = await prisma.requirementSubmission.delete({
     *   where: {
     *     // ... filter to delete one RequirementSubmission
     *   }
     * })
     * 
     */
    delete<T extends RequirementSubmissionDeleteArgs>(args: SelectSubset<T, RequirementSubmissionDeleteArgs<ExtArgs>>): Prisma__RequirementSubmissionClient<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequirementSubmission.
     * @param {RequirementSubmissionUpdateArgs} args - Arguments to update one RequirementSubmission.
     * @example
     * // Update one RequirementSubmission
     * const requirementSubmission = await prisma.requirementSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequirementSubmissionUpdateArgs>(args: SelectSubset<T, RequirementSubmissionUpdateArgs<ExtArgs>>): Prisma__RequirementSubmissionClient<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequirementSubmissions.
     * @param {RequirementSubmissionDeleteManyArgs} args - Arguments to filter RequirementSubmissions to delete.
     * @example
     * // Delete a few RequirementSubmissions
     * const { count } = await prisma.requirementSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequirementSubmissionDeleteManyArgs>(args?: SelectSubset<T, RequirementSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequirementSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequirementSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequirementSubmissions
     * const requirementSubmission = await prisma.requirementSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequirementSubmissionUpdateManyArgs>(args: SelectSubset<T, RequirementSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequirementSubmissions and returns the data updated in the database.
     * @param {RequirementSubmissionUpdateManyAndReturnArgs} args - Arguments to update many RequirementSubmissions.
     * @example
     * // Update many RequirementSubmissions
     * const requirementSubmission = await prisma.requirementSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequirementSubmissions and only return the `id`
     * const requirementSubmissionWithIdOnly = await prisma.requirementSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequirementSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, RequirementSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequirementSubmission.
     * @param {RequirementSubmissionUpsertArgs} args - Arguments to update or create a RequirementSubmission.
     * @example
     * // Update or create a RequirementSubmission
     * const requirementSubmission = await prisma.requirementSubmission.upsert({
     *   create: {
     *     // ... data to create a RequirementSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequirementSubmission we want to update
     *   }
     * })
     */
    upsert<T extends RequirementSubmissionUpsertArgs>(args: SelectSubset<T, RequirementSubmissionUpsertArgs<ExtArgs>>): Prisma__RequirementSubmissionClient<$Result.GetResult<Prisma.$RequirementSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequirementSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequirementSubmissionCountArgs} args - Arguments to filter RequirementSubmissions to count.
     * @example
     * // Count the number of RequirementSubmissions
     * const count = await prisma.requirementSubmission.count({
     *   where: {
     *     // ... the filter for the RequirementSubmissions we want to count
     *   }
     * })
    **/
    count<T extends RequirementSubmissionCountArgs>(
      args?: Subset<T, RequirementSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequirementSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequirementSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequirementSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequirementSubmissionAggregateArgs>(args: Subset<T, RequirementSubmissionAggregateArgs>): Prisma.PrismaPromise<GetRequirementSubmissionAggregateType<T>>

    /**
     * Group by RequirementSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequirementSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequirementSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequirementSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: RequirementSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequirementSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequirementSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequirementSubmission model
   */
  readonly fields: RequirementSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequirementSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequirementSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends RequirementSubmission$userArgs<ExtArgs> = {}>(args?: Subset<T, RequirementSubmission$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequirementSubmission model
   */
  interface RequirementSubmissionFieldRefs {
    readonly id: FieldRef<"RequirementSubmission", 'String'>
    readonly userId: FieldRef<"RequirementSubmission", 'String'>
    readonly projectType: FieldRef<"RequirementSubmission", 'String'>
    readonly urgency: FieldRef<"RequirementSubmission", 'String'>
    readonly budget: FieldRef<"RequirementSubmission", 'String'>
    readonly requirements: FieldRef<"RequirementSubmission", 'String'>
    readonly createdAt: FieldRef<"RequirementSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequirementSubmission findUnique
   */
  export type RequirementSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which RequirementSubmission to fetch.
     */
    where: RequirementSubmissionWhereUniqueInput
  }

  /**
   * RequirementSubmission findUniqueOrThrow
   */
  export type RequirementSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which RequirementSubmission to fetch.
     */
    where: RequirementSubmissionWhereUniqueInput
  }

  /**
   * RequirementSubmission findFirst
   */
  export type RequirementSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which RequirementSubmission to fetch.
     */
    where?: RequirementSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequirementSubmissions to fetch.
     */
    orderBy?: RequirementSubmissionOrderByWithRelationInput | RequirementSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequirementSubmissions.
     */
    cursor?: RequirementSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequirementSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequirementSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequirementSubmissions.
     */
    distinct?: RequirementSubmissionScalarFieldEnum | RequirementSubmissionScalarFieldEnum[]
  }

  /**
   * RequirementSubmission findFirstOrThrow
   */
  export type RequirementSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which RequirementSubmission to fetch.
     */
    where?: RequirementSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequirementSubmissions to fetch.
     */
    orderBy?: RequirementSubmissionOrderByWithRelationInput | RequirementSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequirementSubmissions.
     */
    cursor?: RequirementSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequirementSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequirementSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequirementSubmissions.
     */
    distinct?: RequirementSubmissionScalarFieldEnum | RequirementSubmissionScalarFieldEnum[]
  }

  /**
   * RequirementSubmission findMany
   */
  export type RequirementSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which RequirementSubmissions to fetch.
     */
    where?: RequirementSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequirementSubmissions to fetch.
     */
    orderBy?: RequirementSubmissionOrderByWithRelationInput | RequirementSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequirementSubmissions.
     */
    cursor?: RequirementSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequirementSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequirementSubmissions.
     */
    skip?: number
    distinct?: RequirementSubmissionScalarFieldEnum | RequirementSubmissionScalarFieldEnum[]
  }

  /**
   * RequirementSubmission create
   */
  export type RequirementSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a RequirementSubmission.
     */
    data: XOR<RequirementSubmissionCreateInput, RequirementSubmissionUncheckedCreateInput>
  }

  /**
   * RequirementSubmission createMany
   */
  export type RequirementSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequirementSubmissions.
     */
    data: RequirementSubmissionCreateManyInput | RequirementSubmissionCreateManyInput[]
  }

  /**
   * RequirementSubmission createManyAndReturn
   */
  export type RequirementSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many RequirementSubmissions.
     */
    data: RequirementSubmissionCreateManyInput | RequirementSubmissionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequirementSubmission update
   */
  export type RequirementSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a RequirementSubmission.
     */
    data: XOR<RequirementSubmissionUpdateInput, RequirementSubmissionUncheckedUpdateInput>
    /**
     * Choose, which RequirementSubmission to update.
     */
    where: RequirementSubmissionWhereUniqueInput
  }

  /**
   * RequirementSubmission updateMany
   */
  export type RequirementSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequirementSubmissions.
     */
    data: XOR<RequirementSubmissionUpdateManyMutationInput, RequirementSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which RequirementSubmissions to update
     */
    where?: RequirementSubmissionWhereInput
    /**
     * Limit how many RequirementSubmissions to update.
     */
    limit?: number
  }

  /**
   * RequirementSubmission updateManyAndReturn
   */
  export type RequirementSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update RequirementSubmissions.
     */
    data: XOR<RequirementSubmissionUpdateManyMutationInput, RequirementSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which RequirementSubmissions to update
     */
    where?: RequirementSubmissionWhereInput
    /**
     * Limit how many RequirementSubmissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequirementSubmission upsert
   */
  export type RequirementSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the RequirementSubmission to update in case it exists.
     */
    where: RequirementSubmissionWhereUniqueInput
    /**
     * In case the RequirementSubmission found by the `where` argument doesn't exist, create a new RequirementSubmission with this data.
     */
    create: XOR<RequirementSubmissionCreateInput, RequirementSubmissionUncheckedCreateInput>
    /**
     * In case the RequirementSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequirementSubmissionUpdateInput, RequirementSubmissionUncheckedUpdateInput>
  }

  /**
   * RequirementSubmission delete
   */
  export type RequirementSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
    /**
     * Filter which RequirementSubmission to delete.
     */
    where: RequirementSubmissionWhereUniqueInput
  }

  /**
   * RequirementSubmission deleteMany
   */
  export type RequirementSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequirementSubmissions to delete
     */
    where?: RequirementSubmissionWhereInput
    /**
     * Limit how many RequirementSubmissions to delete.
     */
    limit?: number
  }

  /**
   * RequirementSubmission.user
   */
  export type RequirementSubmission$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * RequirementSubmission without action
   */
  export type RequirementSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequirementSubmission
     */
    select?: RequirementSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequirementSubmission
     */
    omit?: RequirementSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequirementSubmissionInclude<ExtArgs> | null
  }


  /**
   * Model InvoiceLine
   */

  export type AggregateInvoiceLine = {
    _count: InvoiceLineCountAggregateOutputType | null
    _avg: InvoiceLineAvgAggregateOutputType | null
    _sum: InvoiceLineSumAggregateOutputType | null
    _min: InvoiceLineMinAggregateOutputType | null
    _max: InvoiceLineMaxAggregateOutputType | null
  }

  export type InvoiceLineAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
  }

  export type InvoiceLineSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
  }

  export type InvoiceLineMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    description: string | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
    createdAt: Date | null
  }

  export type InvoiceLineMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    description: string | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
    createdAt: Date | null
  }

  export type InvoiceLineCountAggregateOutputType = {
    id: number
    projectId: number
    description: number
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt: number
    _all: number
  }


  export type InvoiceLineAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type InvoiceLineSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type InvoiceLineMinAggregateInputType = {
    id?: true
    projectId?: true
    description?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
  }

  export type InvoiceLineMaxAggregateInputType = {
    id?: true
    projectId?: true
    description?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
  }

  export type InvoiceLineCountAggregateInputType = {
    id?: true
    projectId?: true
    description?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
    _all?: true
  }

  export type InvoiceLineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceLine to aggregate.
     */
    where?: InvoiceLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceLines to fetch.
     */
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvoiceLines
    **/
    _count?: true | InvoiceLineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceLineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceLineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceLineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceLineMaxAggregateInputType
  }

  export type GetInvoiceLineAggregateType<T extends InvoiceLineAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoiceLine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoiceLine[P]>
      : GetScalarType<T[P], AggregateInvoiceLine[P]>
  }




  export type InvoiceLineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceLineWhereInput
    orderBy?: InvoiceLineOrderByWithAggregationInput | InvoiceLineOrderByWithAggregationInput[]
    by: InvoiceLineScalarFieldEnum[] | InvoiceLineScalarFieldEnum
    having?: InvoiceLineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceLineCountAggregateInputType | true
    _avg?: InvoiceLineAvgAggregateInputType
    _sum?: InvoiceLineSumAggregateInputType
    _min?: InvoiceLineMinAggregateInputType
    _max?: InvoiceLineMaxAggregateInputType
  }

  export type InvoiceLineGroupByOutputType = {
    id: string
    projectId: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt: Date
    _count: InvoiceLineCountAggregateOutputType | null
    _avg: InvoiceLineAvgAggregateOutputType | null
    _sum: InvoiceLineSumAggregateOutputType | null
    _min: InvoiceLineMinAggregateOutputType | null
    _max: InvoiceLineMaxAggregateOutputType | null
  }

  type GetInvoiceLineGroupByPayload<T extends InvoiceLineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceLineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceLineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceLineGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceLineGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceLineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceLine"]>

  export type InvoiceLineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceLine"]>

  export type InvoiceLineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceLine"]>

  export type InvoiceLineSelectScalar = {
    id?: boolean
    projectId?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
  }

  export type InvoiceLineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "description" | "quantity" | "unitPrice" | "totalPrice" | "createdAt", ExtArgs["result"]["invoiceLine"]>
  export type InvoiceLineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type InvoiceLineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type InvoiceLineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $InvoiceLinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvoiceLine"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      description: string
      quantity: number
      unitPrice: number
      totalPrice: number
      createdAt: Date
    }, ExtArgs["result"]["invoiceLine"]>
    composites: {}
  }

  type InvoiceLineGetPayload<S extends boolean | null | undefined | InvoiceLineDefaultArgs> = $Result.GetResult<Prisma.$InvoiceLinePayload, S>

  type InvoiceLineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceLineCountAggregateInputType | true
    }

  export interface InvoiceLineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvoiceLine'], meta: { name: 'InvoiceLine' } }
    /**
     * Find zero or one InvoiceLine that matches the filter.
     * @param {InvoiceLineFindUniqueArgs} args - Arguments to find a InvoiceLine
     * @example
     * // Get one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceLineFindUniqueArgs>(args: SelectSubset<T, InvoiceLineFindUniqueArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvoiceLine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceLineFindUniqueOrThrowArgs} args - Arguments to find a InvoiceLine
     * @example
     * // Get one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceLineFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceLine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineFindFirstArgs} args - Arguments to find a InvoiceLine
     * @example
     * // Get one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceLineFindFirstArgs>(args?: SelectSubset<T, InvoiceLineFindFirstArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceLine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineFindFirstOrThrowArgs} args - Arguments to find a InvoiceLine
     * @example
     * // Get one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceLineFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceLineFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvoiceLines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvoiceLines
     * const invoiceLines = await prisma.invoiceLine.findMany()
     * 
     * // Get first 10 InvoiceLines
     * const invoiceLines = await prisma.invoiceLine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceLineWithIdOnly = await prisma.invoiceLine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceLineFindManyArgs>(args?: SelectSubset<T, InvoiceLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvoiceLine.
     * @param {InvoiceLineCreateArgs} args - Arguments to create a InvoiceLine.
     * @example
     * // Create one InvoiceLine
     * const InvoiceLine = await prisma.invoiceLine.create({
     *   data: {
     *     // ... data to create a InvoiceLine
     *   }
     * })
     * 
     */
    create<T extends InvoiceLineCreateArgs>(args: SelectSubset<T, InvoiceLineCreateArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvoiceLines.
     * @param {InvoiceLineCreateManyArgs} args - Arguments to create many InvoiceLines.
     * @example
     * // Create many InvoiceLines
     * const invoiceLine = await prisma.invoiceLine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceLineCreateManyArgs>(args?: SelectSubset<T, InvoiceLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InvoiceLines and returns the data saved in the database.
     * @param {InvoiceLineCreateManyAndReturnArgs} args - Arguments to create many InvoiceLines.
     * @example
     * // Create many InvoiceLines
     * const invoiceLine = await prisma.invoiceLine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InvoiceLines and only return the `id`
     * const invoiceLineWithIdOnly = await prisma.invoiceLine.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceLineCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InvoiceLine.
     * @param {InvoiceLineDeleteArgs} args - Arguments to delete one InvoiceLine.
     * @example
     * // Delete one InvoiceLine
     * const InvoiceLine = await prisma.invoiceLine.delete({
     *   where: {
     *     // ... filter to delete one InvoiceLine
     *   }
     * })
     * 
     */
    delete<T extends InvoiceLineDeleteArgs>(args: SelectSubset<T, InvoiceLineDeleteArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvoiceLine.
     * @param {InvoiceLineUpdateArgs} args - Arguments to update one InvoiceLine.
     * @example
     * // Update one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceLineUpdateArgs>(args: SelectSubset<T, InvoiceLineUpdateArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvoiceLines.
     * @param {InvoiceLineDeleteManyArgs} args - Arguments to filter InvoiceLines to delete.
     * @example
     * // Delete a few InvoiceLines
     * const { count } = await prisma.invoiceLine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceLineDeleteManyArgs>(args?: SelectSubset<T, InvoiceLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvoiceLines
     * const invoiceLine = await prisma.invoiceLine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceLineUpdateManyArgs>(args: SelectSubset<T, InvoiceLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceLines and returns the data updated in the database.
     * @param {InvoiceLineUpdateManyAndReturnArgs} args - Arguments to update many InvoiceLines.
     * @example
     * // Update many InvoiceLines
     * const invoiceLine = await prisma.invoiceLine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InvoiceLines and only return the `id`
     * const invoiceLineWithIdOnly = await prisma.invoiceLine.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceLineUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InvoiceLine.
     * @param {InvoiceLineUpsertArgs} args - Arguments to update or create a InvoiceLine.
     * @example
     * // Update or create a InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.upsert({
     *   create: {
     *     // ... data to create a InvoiceLine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvoiceLine we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceLineUpsertArgs>(args: SelectSubset<T, InvoiceLineUpsertArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvoiceLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineCountArgs} args - Arguments to filter InvoiceLines to count.
     * @example
     * // Count the number of InvoiceLines
     * const count = await prisma.invoiceLine.count({
     *   where: {
     *     // ... the filter for the InvoiceLines we want to count
     *   }
     * })
    **/
    count<T extends InvoiceLineCountArgs>(
      args?: Subset<T, InvoiceLineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceLineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvoiceLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceLineAggregateArgs>(args: Subset<T, InvoiceLineAggregateArgs>): Prisma.PrismaPromise<GetInvoiceLineAggregateType<T>>

    /**
     * Group by InvoiceLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceLineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceLineGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceLineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvoiceLine model
   */
  readonly fields: InvoiceLineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvoiceLine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceLineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvoiceLine model
   */
  interface InvoiceLineFieldRefs {
    readonly id: FieldRef<"InvoiceLine", 'String'>
    readonly projectId: FieldRef<"InvoiceLine", 'String'>
    readonly description: FieldRef<"InvoiceLine", 'String'>
    readonly quantity: FieldRef<"InvoiceLine", 'Float'>
    readonly unitPrice: FieldRef<"InvoiceLine", 'Float'>
    readonly totalPrice: FieldRef<"InvoiceLine", 'Float'>
    readonly createdAt: FieldRef<"InvoiceLine", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvoiceLine findUnique
   */
  export type InvoiceLineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLine to fetch.
     */
    where: InvoiceLineWhereUniqueInput
  }

  /**
   * InvoiceLine findUniqueOrThrow
   */
  export type InvoiceLineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLine to fetch.
     */
    where: InvoiceLineWhereUniqueInput
  }

  /**
   * InvoiceLine findFirst
   */
  export type InvoiceLineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLine to fetch.
     */
    where?: InvoiceLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceLines to fetch.
     */
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceLines.
     */
    cursor?: InvoiceLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceLines.
     */
    distinct?: InvoiceLineScalarFieldEnum | InvoiceLineScalarFieldEnum[]
  }

  /**
   * InvoiceLine findFirstOrThrow
   */
  export type InvoiceLineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLine to fetch.
     */
    where?: InvoiceLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceLines to fetch.
     */
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceLines.
     */
    cursor?: InvoiceLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceLines.
     */
    distinct?: InvoiceLineScalarFieldEnum | InvoiceLineScalarFieldEnum[]
  }

  /**
   * InvoiceLine findMany
   */
  export type InvoiceLineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLines to fetch.
     */
    where?: InvoiceLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceLines to fetch.
     */
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvoiceLines.
     */
    cursor?: InvoiceLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceLines.
     */
    skip?: number
    distinct?: InvoiceLineScalarFieldEnum | InvoiceLineScalarFieldEnum[]
  }

  /**
   * InvoiceLine create
   */
  export type InvoiceLineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * The data needed to create a InvoiceLine.
     */
    data: XOR<InvoiceLineCreateInput, InvoiceLineUncheckedCreateInput>
  }

  /**
   * InvoiceLine createMany
   */
  export type InvoiceLineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvoiceLines.
     */
    data: InvoiceLineCreateManyInput | InvoiceLineCreateManyInput[]
  }

  /**
   * InvoiceLine createManyAndReturn
   */
  export type InvoiceLineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * The data used to create many InvoiceLines.
     */
    data: InvoiceLineCreateManyInput | InvoiceLineCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceLine update
   */
  export type InvoiceLineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * The data needed to update a InvoiceLine.
     */
    data: XOR<InvoiceLineUpdateInput, InvoiceLineUncheckedUpdateInput>
    /**
     * Choose, which InvoiceLine to update.
     */
    where: InvoiceLineWhereUniqueInput
  }

  /**
   * InvoiceLine updateMany
   */
  export type InvoiceLineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvoiceLines.
     */
    data: XOR<InvoiceLineUpdateManyMutationInput, InvoiceLineUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceLines to update
     */
    where?: InvoiceLineWhereInput
    /**
     * Limit how many InvoiceLines to update.
     */
    limit?: number
  }

  /**
   * InvoiceLine updateManyAndReturn
   */
  export type InvoiceLineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * The data used to update InvoiceLines.
     */
    data: XOR<InvoiceLineUpdateManyMutationInput, InvoiceLineUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceLines to update
     */
    where?: InvoiceLineWhereInput
    /**
     * Limit how many InvoiceLines to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceLine upsert
   */
  export type InvoiceLineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * The filter to search for the InvoiceLine to update in case it exists.
     */
    where: InvoiceLineWhereUniqueInput
    /**
     * In case the InvoiceLine found by the `where` argument doesn't exist, create a new InvoiceLine with this data.
     */
    create: XOR<InvoiceLineCreateInput, InvoiceLineUncheckedCreateInput>
    /**
     * In case the InvoiceLine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceLineUpdateInput, InvoiceLineUncheckedUpdateInput>
  }

  /**
   * InvoiceLine delete
   */
  export type InvoiceLineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter which InvoiceLine to delete.
     */
    where: InvoiceLineWhereUniqueInput
  }

  /**
   * InvoiceLine deleteMany
   */
  export type InvoiceLineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceLines to delete
     */
    where?: InvoiceLineWhereInput
    /**
     * Limit how many InvoiceLines to delete.
     */
    limit?: number
  }

  /**
   * InvoiceLine without action
   */
  export type InvoiceLineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceLine
     */
    omit?: InvoiceLineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    businessName: 'businessName',
    industry: 'industry',
    phoneNumber: 'phoneNumber',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    projectRef: 'projectRef',
    name: 'name',
    description: 'description',
    service: 'service',
    status: 'status',
    priority: 'priority',
    estimatedHours: 'estimatedHours',
    actualHours: 'actualHours',
    quoteAmount: 'quoteAmount',
    location: 'location',
    startDate: 'startDate',
    targetDate: 'targetDate',
    completedDate: 'completedDate',
    currentStage: 'currentStage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    clientId: 'clientId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectStageScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    stageName: 'stageName',
    status: 'status',
    order: 'order',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectStageScalarFieldEnum = (typeof ProjectStageScalarFieldEnum)[keyof typeof ProjectStageScalarFieldEnum]


  export const MaterialCostScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    material: 'material',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    totalCost: 'totalCost',
    supplier: 'supplier',
    category: 'category',
    date: 'date',
    invoiceId: 'invoiceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MaterialCostScalarFieldEnum = (typeof MaterialCostScalarFieldEnum)[keyof typeof MaterialCostScalarFieldEnum]


  export const SupplierInvoiceScalarFieldEnum: {
    id: 'id',
    invoiceNumber: 'invoiceNumber',
    supplier: 'supplier',
    totalAmount: 'totalAmount',
    taxAmount: 'taxAmount',
    netAmount: 'netAmount',
    currency: 'currency',
    invoiceDate: 'invoiceDate',
    dueDate: 'dueDate',
    status: 'status',
    uploadedFileUrl: 'uploadedFileUrl',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplierInvoiceScalarFieldEnum = (typeof SupplierInvoiceScalarFieldEnum)[keyof typeof SupplierInvoiceScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    filename: 'filename',
    originalName: 'originalName',
    fileType: 'fileType',
    fileSize: 'fileSize',
    fileUrl: 'fileUrl',
    uploadedAt: 'uploadedAt',
    isPublic: 'isPublic'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const DocumentGenerationScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    templateData: 'templateData',
    status: 'status',
    generatedBy: 'generatedBy',
    autoSend: 'autoSend',
    recipientEmail: 'recipientEmail',
    emailSent: 'emailSent',
    emailSentAt: 'emailSentAt',
    fileUrl: 'fileUrl',
    generatedAt: 'generatedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentGenerationScalarFieldEnum = (typeof DocumentGenerationScalarFieldEnum)[keyof typeof DocumentGenerationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    content: 'content',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const RequirementSubmissionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    projectType: 'projectType',
    urgency: 'urgency',
    budget: 'budget',
    requirements: 'requirements',
    createdAt: 'createdAt'
  };

  export type RequirementSubmissionScalarFieldEnum = (typeof RequirementSubmissionScalarFieldEnum)[keyof typeof RequirementSubmissionScalarFieldEnum]


  export const InvoiceLineScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    description: 'description',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    totalPrice: 'totalPrice',
    createdAt: 'createdAt'
  };

  export type InvoiceLineScalarFieldEnum = (typeof InvoiceLineScalarFieldEnum)[keyof typeof InvoiceLineScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    messages?: MessageListRelationFilter
    projects?: ProjectListRelationFilter
    requirements?: RequirementSubmissionListRelationFilter
    sessions?: SessionListRelationFilter
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    requirements?: RequirementSubmissionOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    client?: ClientOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    messages?: MessageListRelationFilter
    projects?: ProjectListRelationFilter
    requirements?: RequirementSubmissionListRelationFilter
    sessions?: SessionListRelationFilter
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    userId?: StringFilter<"Client"> | string
    businessName?: StringNullableFilter<"Client"> | string | null
    industry?: StringNullableFilter<"Client"> | string | null
    phoneNumber?: StringNullableFilter<"Client"> | string | null
    address?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    projects?: ProjectListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    businessName?: StringNullableFilter<"Client"> | string | null
    industry?: StringNullableFilter<"Client"> | string | null
    phoneNumber?: StringNullableFilter<"Client"> | string | null
    address?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    projects?: ProjectListRelationFilter
  }, "id" | "userId">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    userId?: StringWithAggregatesFilter<"Client"> | string
    businessName?: StringNullableWithAggregatesFilter<"Client"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Client"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"Client"> | string | null
    address?: StringNullableWithAggregatesFilter<"Client"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    projectRef?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    service?: StringFilter<"Project"> | string
    status?: StringFilter<"Project"> | string
    priority?: StringFilter<"Project"> | string
    estimatedHours?: IntNullableFilter<"Project"> | number | null
    actualHours?: IntNullableFilter<"Project"> | number | null
    quoteAmount?: FloatNullableFilter<"Project"> | number | null
    location?: StringNullableFilter<"Project"> | string | null
    startDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    targetDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    currentStage?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdBy?: StringNullableFilter<"Project"> | string | null
    clientId?: StringNullableFilter<"Project"> | string | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    stages?: ProjectStageListRelationFilter
    costs?: MaterialCostListRelationFilter
    documents?: DocumentListRelationFilter
    invoiceLines?: InvoiceLineListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    projectRef?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    service?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrderInput | SortOrder
    actualHours?: SortOrderInput | SortOrder
    quoteAmount?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    targetDate?: SortOrderInput | SortOrder
    completedDate?: SortOrderInput | SortOrder
    currentStage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    clientId?: SortOrderInput | SortOrder
    creator?: UserOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
    stages?: ProjectStageOrderByRelationAggregateInput
    costs?: MaterialCostOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    invoiceLines?: InvoiceLineOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectRef?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    service?: StringFilter<"Project"> | string
    status?: StringFilter<"Project"> | string
    priority?: StringFilter<"Project"> | string
    estimatedHours?: IntNullableFilter<"Project"> | number | null
    actualHours?: IntNullableFilter<"Project"> | number | null
    quoteAmount?: FloatNullableFilter<"Project"> | number | null
    location?: StringNullableFilter<"Project"> | string | null
    startDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    targetDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    currentStage?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdBy?: StringNullableFilter<"Project"> | string | null
    clientId?: StringNullableFilter<"Project"> | string | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    stages?: ProjectStageListRelationFilter
    costs?: MaterialCostListRelationFilter
    documents?: DocumentListRelationFilter
    invoiceLines?: InvoiceLineListRelationFilter
  }, "id" | "projectRef">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    projectRef?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    service?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrderInput | SortOrder
    actualHours?: SortOrderInput | SortOrder
    quoteAmount?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    targetDate?: SortOrderInput | SortOrder
    completedDate?: SortOrderInput | SortOrder
    currentStage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    clientId?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    projectRef?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    service?: StringWithAggregatesFilter<"Project"> | string
    status?: StringWithAggregatesFilter<"Project"> | string
    priority?: StringWithAggregatesFilter<"Project"> | string
    estimatedHours?: IntNullableWithAggregatesFilter<"Project"> | number | null
    actualHours?: IntNullableWithAggregatesFilter<"Project"> | number | null
    quoteAmount?: FloatNullableWithAggregatesFilter<"Project"> | number | null
    location?: StringNullableWithAggregatesFilter<"Project"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    targetDate?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    completedDate?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    currentStage?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Project"> | string | null
    clientId?: StringNullableWithAggregatesFilter<"Project"> | string | null
  }

  export type ProjectStageWhereInput = {
    AND?: ProjectStageWhereInput | ProjectStageWhereInput[]
    OR?: ProjectStageWhereInput[]
    NOT?: ProjectStageWhereInput | ProjectStageWhereInput[]
    id?: StringFilter<"ProjectStage"> | string
    projectId?: StringFilter<"ProjectStage"> | string
    stageName?: StringFilter<"ProjectStage"> | string
    status?: StringFilter<"ProjectStage"> | string
    order?: IntFilter<"ProjectStage"> | number
    startedAt?: DateTimeNullableFilter<"ProjectStage"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"ProjectStage"> | Date | string | null
    notes?: StringNullableFilter<"ProjectStage"> | string | null
    createdAt?: DateTimeFilter<"ProjectStage"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectStage"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectStageOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    stageName?: SortOrder
    status?: SortOrder
    order?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectStageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectStageWhereInput | ProjectStageWhereInput[]
    OR?: ProjectStageWhereInput[]
    NOT?: ProjectStageWhereInput | ProjectStageWhereInput[]
    projectId?: StringFilter<"ProjectStage"> | string
    stageName?: StringFilter<"ProjectStage"> | string
    status?: StringFilter<"ProjectStage"> | string
    order?: IntFilter<"ProjectStage"> | number
    startedAt?: DateTimeNullableFilter<"ProjectStage"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"ProjectStage"> | Date | string | null
    notes?: StringNullableFilter<"ProjectStage"> | string | null
    createdAt?: DateTimeFilter<"ProjectStage"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectStage"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProjectStageOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    stageName?: SortOrder
    status?: SortOrder
    order?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectStageCountOrderByAggregateInput
    _avg?: ProjectStageAvgOrderByAggregateInput
    _max?: ProjectStageMaxOrderByAggregateInput
    _min?: ProjectStageMinOrderByAggregateInput
    _sum?: ProjectStageSumOrderByAggregateInput
  }

  export type ProjectStageScalarWhereWithAggregatesInput = {
    AND?: ProjectStageScalarWhereWithAggregatesInput | ProjectStageScalarWhereWithAggregatesInput[]
    OR?: ProjectStageScalarWhereWithAggregatesInput[]
    NOT?: ProjectStageScalarWhereWithAggregatesInput | ProjectStageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectStage"> | string
    projectId?: StringWithAggregatesFilter<"ProjectStage"> | string
    stageName?: StringWithAggregatesFilter<"ProjectStage"> | string
    status?: StringWithAggregatesFilter<"ProjectStage"> | string
    order?: IntWithAggregatesFilter<"ProjectStage"> | number
    startedAt?: DateTimeNullableWithAggregatesFilter<"ProjectStage"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"ProjectStage"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"ProjectStage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProjectStage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectStage"> | Date | string
  }

  export type MaterialCostWhereInput = {
    AND?: MaterialCostWhereInput | MaterialCostWhereInput[]
    OR?: MaterialCostWhereInput[]
    NOT?: MaterialCostWhereInput | MaterialCostWhereInput[]
    id?: StringFilter<"MaterialCost"> | string
    projectId?: StringFilter<"MaterialCost"> | string
    material?: StringFilter<"MaterialCost"> | string
    quantity?: FloatFilter<"MaterialCost"> | number
    unitPrice?: FloatFilter<"MaterialCost"> | number
    totalCost?: FloatFilter<"MaterialCost"> | number
    supplier?: StringNullableFilter<"MaterialCost"> | string | null
    category?: StringNullableFilter<"MaterialCost"> | string | null
    date?: DateTimeFilter<"MaterialCost"> | Date | string
    invoiceId?: StringNullableFilter<"MaterialCost"> | string | null
    createdAt?: DateTimeFilter<"MaterialCost"> | Date | string
    updatedAt?: DateTimeFilter<"MaterialCost"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    invoice?: XOR<SupplierInvoiceNullableScalarRelationFilter, SupplierInvoiceWhereInput> | null
  }

  export type MaterialCostOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    material?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    date?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    invoice?: SupplierInvoiceOrderByWithRelationInput
  }

  export type MaterialCostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MaterialCostWhereInput | MaterialCostWhereInput[]
    OR?: MaterialCostWhereInput[]
    NOT?: MaterialCostWhereInput | MaterialCostWhereInput[]
    projectId?: StringFilter<"MaterialCost"> | string
    material?: StringFilter<"MaterialCost"> | string
    quantity?: FloatFilter<"MaterialCost"> | number
    unitPrice?: FloatFilter<"MaterialCost"> | number
    totalCost?: FloatFilter<"MaterialCost"> | number
    supplier?: StringNullableFilter<"MaterialCost"> | string | null
    category?: StringNullableFilter<"MaterialCost"> | string | null
    date?: DateTimeFilter<"MaterialCost"> | Date | string
    invoiceId?: StringNullableFilter<"MaterialCost"> | string | null
    createdAt?: DateTimeFilter<"MaterialCost"> | Date | string
    updatedAt?: DateTimeFilter<"MaterialCost"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    invoice?: XOR<SupplierInvoiceNullableScalarRelationFilter, SupplierInvoiceWhereInput> | null
  }, "id">

  export type MaterialCostOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    material?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    date?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MaterialCostCountOrderByAggregateInput
    _avg?: MaterialCostAvgOrderByAggregateInput
    _max?: MaterialCostMaxOrderByAggregateInput
    _min?: MaterialCostMinOrderByAggregateInput
    _sum?: MaterialCostSumOrderByAggregateInput
  }

  export type MaterialCostScalarWhereWithAggregatesInput = {
    AND?: MaterialCostScalarWhereWithAggregatesInput | MaterialCostScalarWhereWithAggregatesInput[]
    OR?: MaterialCostScalarWhereWithAggregatesInput[]
    NOT?: MaterialCostScalarWhereWithAggregatesInput | MaterialCostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MaterialCost"> | string
    projectId?: StringWithAggregatesFilter<"MaterialCost"> | string
    material?: StringWithAggregatesFilter<"MaterialCost"> | string
    quantity?: FloatWithAggregatesFilter<"MaterialCost"> | number
    unitPrice?: FloatWithAggregatesFilter<"MaterialCost"> | number
    totalCost?: FloatWithAggregatesFilter<"MaterialCost"> | number
    supplier?: StringNullableWithAggregatesFilter<"MaterialCost"> | string | null
    category?: StringNullableWithAggregatesFilter<"MaterialCost"> | string | null
    date?: DateTimeWithAggregatesFilter<"MaterialCost"> | Date | string
    invoiceId?: StringNullableWithAggregatesFilter<"MaterialCost"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MaterialCost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MaterialCost"> | Date | string
  }

  export type SupplierInvoiceWhereInput = {
    AND?: SupplierInvoiceWhereInput | SupplierInvoiceWhereInput[]
    OR?: SupplierInvoiceWhereInput[]
    NOT?: SupplierInvoiceWhereInput | SupplierInvoiceWhereInput[]
    id?: StringFilter<"SupplierInvoice"> | string
    invoiceNumber?: StringFilter<"SupplierInvoice"> | string
    supplier?: StringFilter<"SupplierInvoice"> | string
    totalAmount?: FloatFilter<"SupplierInvoice"> | number
    taxAmount?: FloatFilter<"SupplierInvoice"> | number
    netAmount?: FloatFilter<"SupplierInvoice"> | number
    currency?: StringFilter<"SupplierInvoice"> | string
    invoiceDate?: DateTimeFilter<"SupplierInvoice"> | Date | string
    dueDate?: DateTimeNullableFilter<"SupplierInvoice"> | Date | string | null
    status?: StringFilter<"SupplierInvoice"> | string
    uploadedFileUrl?: StringNullableFilter<"SupplierInvoice"> | string | null
    notes?: StringNullableFilter<"SupplierInvoice"> | string | null
    createdAt?: DateTimeFilter<"SupplierInvoice"> | Date | string
    updatedAt?: DateTimeFilter<"SupplierInvoice"> | Date | string
    materialCosts?: MaterialCostListRelationFilter
  }

  export type SupplierInvoiceOrderByWithRelationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    supplier?: SortOrder
    totalAmount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    currency?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    status?: SortOrder
    uploadedFileUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    materialCosts?: MaterialCostOrderByRelationAggregateInput
  }

  export type SupplierInvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invoiceNumber?: string
    AND?: SupplierInvoiceWhereInput | SupplierInvoiceWhereInput[]
    OR?: SupplierInvoiceWhereInput[]
    NOT?: SupplierInvoiceWhereInput | SupplierInvoiceWhereInput[]
    supplier?: StringFilter<"SupplierInvoice"> | string
    totalAmount?: FloatFilter<"SupplierInvoice"> | number
    taxAmount?: FloatFilter<"SupplierInvoice"> | number
    netAmount?: FloatFilter<"SupplierInvoice"> | number
    currency?: StringFilter<"SupplierInvoice"> | string
    invoiceDate?: DateTimeFilter<"SupplierInvoice"> | Date | string
    dueDate?: DateTimeNullableFilter<"SupplierInvoice"> | Date | string | null
    status?: StringFilter<"SupplierInvoice"> | string
    uploadedFileUrl?: StringNullableFilter<"SupplierInvoice"> | string | null
    notes?: StringNullableFilter<"SupplierInvoice"> | string | null
    createdAt?: DateTimeFilter<"SupplierInvoice"> | Date | string
    updatedAt?: DateTimeFilter<"SupplierInvoice"> | Date | string
    materialCosts?: MaterialCostListRelationFilter
  }, "id" | "invoiceNumber">

  export type SupplierInvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    supplier?: SortOrder
    totalAmount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    currency?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    status?: SortOrder
    uploadedFileUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplierInvoiceCountOrderByAggregateInput
    _avg?: SupplierInvoiceAvgOrderByAggregateInput
    _max?: SupplierInvoiceMaxOrderByAggregateInput
    _min?: SupplierInvoiceMinOrderByAggregateInput
    _sum?: SupplierInvoiceSumOrderByAggregateInput
  }

  export type SupplierInvoiceScalarWhereWithAggregatesInput = {
    AND?: SupplierInvoiceScalarWhereWithAggregatesInput | SupplierInvoiceScalarWhereWithAggregatesInput[]
    OR?: SupplierInvoiceScalarWhereWithAggregatesInput[]
    NOT?: SupplierInvoiceScalarWhereWithAggregatesInput | SupplierInvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupplierInvoice"> | string
    invoiceNumber?: StringWithAggregatesFilter<"SupplierInvoice"> | string
    supplier?: StringWithAggregatesFilter<"SupplierInvoice"> | string
    totalAmount?: FloatWithAggregatesFilter<"SupplierInvoice"> | number
    taxAmount?: FloatWithAggregatesFilter<"SupplierInvoice"> | number
    netAmount?: FloatWithAggregatesFilter<"SupplierInvoice"> | number
    currency?: StringWithAggregatesFilter<"SupplierInvoice"> | string
    invoiceDate?: DateTimeWithAggregatesFilter<"SupplierInvoice"> | Date | string
    dueDate?: DateTimeNullableWithAggregatesFilter<"SupplierInvoice"> | Date | string | null
    status?: StringWithAggregatesFilter<"SupplierInvoice"> | string
    uploadedFileUrl?: StringNullableWithAggregatesFilter<"SupplierInvoice"> | string | null
    notes?: StringNullableWithAggregatesFilter<"SupplierInvoice"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SupplierInvoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupplierInvoice"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    projectId?: StringFilter<"Document"> | string
    filename?: StringFilter<"Document"> | string
    originalName?: StringFilter<"Document"> | string
    fileType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    fileUrl?: StringNullableFilter<"Document"> | string | null
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    isPublic?: BoolFilter<"Document"> | boolean
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    generations?: DocumentGenerationListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    fileUrl?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    isPublic?: SortOrder
    project?: ProjectOrderByWithRelationInput
    generations?: DocumentGenerationOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    projectId?: StringFilter<"Document"> | string
    filename?: StringFilter<"Document"> | string
    originalName?: StringFilter<"Document"> | string
    fileType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    fileUrl?: StringNullableFilter<"Document"> | string | null
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    isPublic?: BoolFilter<"Document"> | boolean
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    generations?: DocumentGenerationListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    fileUrl?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    isPublic?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    projectId?: StringWithAggregatesFilter<"Document"> | string
    filename?: StringWithAggregatesFilter<"Document"> | string
    originalName?: StringWithAggregatesFilter<"Document"> | string
    fileType?: StringWithAggregatesFilter<"Document"> | string
    fileSize?: IntWithAggregatesFilter<"Document"> | number
    fileUrl?: StringNullableWithAggregatesFilter<"Document"> | string | null
    uploadedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    isPublic?: BoolWithAggregatesFilter<"Document"> | boolean
  }

  export type DocumentGenerationWhereInput = {
    AND?: DocumentGenerationWhereInput | DocumentGenerationWhereInput[]
    OR?: DocumentGenerationWhereInput[]
    NOT?: DocumentGenerationWhereInput | DocumentGenerationWhereInput[]
    id?: StringFilter<"DocumentGeneration"> | string
    documentId?: StringFilter<"DocumentGeneration"> | string
    documentType?: StringFilter<"DocumentGeneration"> | string
    documentNumber?: StringFilter<"DocumentGeneration"> | string
    templateData?: StringFilter<"DocumentGeneration"> | string
    status?: StringFilter<"DocumentGeneration"> | string
    generatedBy?: StringNullableFilter<"DocumentGeneration"> | string | null
    autoSend?: BoolFilter<"DocumentGeneration"> | boolean
    recipientEmail?: StringNullableFilter<"DocumentGeneration"> | string | null
    emailSent?: BoolFilter<"DocumentGeneration"> | boolean
    emailSentAt?: DateTimeNullableFilter<"DocumentGeneration"> | Date | string | null
    fileUrl?: StringNullableFilter<"DocumentGeneration"> | string | null
    generatedAt?: DateTimeNullableFilter<"DocumentGeneration"> | Date | string | null
    createdAt?: DateTimeFilter<"DocumentGeneration"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentGeneration"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type DocumentGenerationOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    templateData?: SortOrder
    status?: SortOrder
    generatedBy?: SortOrderInput | SortOrder
    autoSend?: SortOrder
    recipientEmail?: SortOrderInput | SortOrder
    emailSent?: SortOrder
    emailSentAt?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    generatedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type DocumentGenerationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentNumber?: string
    AND?: DocumentGenerationWhereInput | DocumentGenerationWhereInput[]
    OR?: DocumentGenerationWhereInput[]
    NOT?: DocumentGenerationWhereInput | DocumentGenerationWhereInput[]
    documentId?: StringFilter<"DocumentGeneration"> | string
    documentType?: StringFilter<"DocumentGeneration"> | string
    templateData?: StringFilter<"DocumentGeneration"> | string
    status?: StringFilter<"DocumentGeneration"> | string
    generatedBy?: StringNullableFilter<"DocumentGeneration"> | string | null
    autoSend?: BoolFilter<"DocumentGeneration"> | boolean
    recipientEmail?: StringNullableFilter<"DocumentGeneration"> | string | null
    emailSent?: BoolFilter<"DocumentGeneration"> | boolean
    emailSentAt?: DateTimeNullableFilter<"DocumentGeneration"> | Date | string | null
    fileUrl?: StringNullableFilter<"DocumentGeneration"> | string | null
    generatedAt?: DateTimeNullableFilter<"DocumentGeneration"> | Date | string | null
    createdAt?: DateTimeFilter<"DocumentGeneration"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentGeneration"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id" | "documentNumber">

  export type DocumentGenerationOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    templateData?: SortOrder
    status?: SortOrder
    generatedBy?: SortOrderInput | SortOrder
    autoSend?: SortOrder
    recipientEmail?: SortOrderInput | SortOrder
    emailSent?: SortOrder
    emailSentAt?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    generatedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentGenerationCountOrderByAggregateInput
    _max?: DocumentGenerationMaxOrderByAggregateInput
    _min?: DocumentGenerationMinOrderByAggregateInput
  }

  export type DocumentGenerationScalarWhereWithAggregatesInput = {
    AND?: DocumentGenerationScalarWhereWithAggregatesInput | DocumentGenerationScalarWhereWithAggregatesInput[]
    OR?: DocumentGenerationScalarWhereWithAggregatesInput[]
    NOT?: DocumentGenerationScalarWhereWithAggregatesInput | DocumentGenerationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentGeneration"> | string
    documentId?: StringWithAggregatesFilter<"DocumentGeneration"> | string
    documentType?: StringWithAggregatesFilter<"DocumentGeneration"> | string
    documentNumber?: StringWithAggregatesFilter<"DocumentGeneration"> | string
    templateData?: StringWithAggregatesFilter<"DocumentGeneration"> | string
    status?: StringWithAggregatesFilter<"DocumentGeneration"> | string
    generatedBy?: StringNullableWithAggregatesFilter<"DocumentGeneration"> | string | null
    autoSend?: BoolWithAggregatesFilter<"DocumentGeneration"> | boolean
    recipientEmail?: StringNullableWithAggregatesFilter<"DocumentGeneration"> | string | null
    emailSent?: BoolWithAggregatesFilter<"DocumentGeneration"> | boolean
    emailSentAt?: DateTimeNullableWithAggregatesFilter<"DocumentGeneration"> | Date | string | null
    fileUrl?: StringNullableWithAggregatesFilter<"DocumentGeneration"> | string | null
    generatedAt?: DateTimeNullableWithAggregatesFilter<"DocumentGeneration"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DocumentGeneration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DocumentGeneration"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    userId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    userId?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type RequirementSubmissionWhereInput = {
    AND?: RequirementSubmissionWhereInput | RequirementSubmissionWhereInput[]
    OR?: RequirementSubmissionWhereInput[]
    NOT?: RequirementSubmissionWhereInput | RequirementSubmissionWhereInput[]
    id?: StringFilter<"RequirementSubmission"> | string
    userId?: StringNullableFilter<"RequirementSubmission"> | string | null
    projectType?: StringFilter<"RequirementSubmission"> | string
    urgency?: StringFilter<"RequirementSubmission"> | string
    budget?: StringFilter<"RequirementSubmission"> | string
    requirements?: StringFilter<"RequirementSubmission"> | string
    createdAt?: DateTimeFilter<"RequirementSubmission"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type RequirementSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    projectType?: SortOrder
    urgency?: SortOrder
    budget?: SortOrder
    requirements?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RequirementSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RequirementSubmissionWhereInput | RequirementSubmissionWhereInput[]
    OR?: RequirementSubmissionWhereInput[]
    NOT?: RequirementSubmissionWhereInput | RequirementSubmissionWhereInput[]
    userId?: StringNullableFilter<"RequirementSubmission"> | string | null
    projectType?: StringFilter<"RequirementSubmission"> | string
    urgency?: StringFilter<"RequirementSubmission"> | string
    budget?: StringFilter<"RequirementSubmission"> | string
    requirements?: StringFilter<"RequirementSubmission"> | string
    createdAt?: DateTimeFilter<"RequirementSubmission"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type RequirementSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    projectType?: SortOrder
    urgency?: SortOrder
    budget?: SortOrder
    requirements?: SortOrder
    createdAt?: SortOrder
    _count?: RequirementSubmissionCountOrderByAggregateInput
    _max?: RequirementSubmissionMaxOrderByAggregateInput
    _min?: RequirementSubmissionMinOrderByAggregateInput
  }

  export type RequirementSubmissionScalarWhereWithAggregatesInput = {
    AND?: RequirementSubmissionScalarWhereWithAggregatesInput | RequirementSubmissionScalarWhereWithAggregatesInput[]
    OR?: RequirementSubmissionScalarWhereWithAggregatesInput[]
    NOT?: RequirementSubmissionScalarWhereWithAggregatesInput | RequirementSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequirementSubmission"> | string
    userId?: StringNullableWithAggregatesFilter<"RequirementSubmission"> | string | null
    projectType?: StringWithAggregatesFilter<"RequirementSubmission"> | string
    urgency?: StringWithAggregatesFilter<"RequirementSubmission"> | string
    budget?: StringWithAggregatesFilter<"RequirementSubmission"> | string
    requirements?: StringWithAggregatesFilter<"RequirementSubmission"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RequirementSubmission"> | Date | string
  }

  export type InvoiceLineWhereInput = {
    AND?: InvoiceLineWhereInput | InvoiceLineWhereInput[]
    OR?: InvoiceLineWhereInput[]
    NOT?: InvoiceLineWhereInput | InvoiceLineWhereInput[]
    id?: StringFilter<"InvoiceLine"> | string
    projectId?: StringFilter<"InvoiceLine"> | string
    description?: StringFilter<"InvoiceLine"> | string
    quantity?: FloatFilter<"InvoiceLine"> | number
    unitPrice?: FloatFilter<"InvoiceLine"> | number
    totalPrice?: FloatFilter<"InvoiceLine"> | number
    createdAt?: DateTimeFilter<"InvoiceLine"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type InvoiceLineOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type InvoiceLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvoiceLineWhereInput | InvoiceLineWhereInput[]
    OR?: InvoiceLineWhereInput[]
    NOT?: InvoiceLineWhereInput | InvoiceLineWhereInput[]
    projectId?: StringFilter<"InvoiceLine"> | string
    description?: StringFilter<"InvoiceLine"> | string
    quantity?: FloatFilter<"InvoiceLine"> | number
    unitPrice?: FloatFilter<"InvoiceLine"> | number
    totalPrice?: FloatFilter<"InvoiceLine"> | number
    createdAt?: DateTimeFilter<"InvoiceLine"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type InvoiceLineOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    _count?: InvoiceLineCountOrderByAggregateInput
    _avg?: InvoiceLineAvgOrderByAggregateInput
    _max?: InvoiceLineMaxOrderByAggregateInput
    _min?: InvoiceLineMinOrderByAggregateInput
    _sum?: InvoiceLineSumOrderByAggregateInput
  }

  export type InvoiceLineScalarWhereWithAggregatesInput = {
    AND?: InvoiceLineScalarWhereWithAggregatesInput | InvoiceLineScalarWhereWithAggregatesInput[]
    OR?: InvoiceLineScalarWhereWithAggregatesInput[]
    NOT?: InvoiceLineScalarWhereWithAggregatesInput | InvoiceLineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InvoiceLine"> | string
    projectId?: StringWithAggregatesFilter<"InvoiceLine"> | string
    description?: StringWithAggregatesFilter<"InvoiceLine"> | string
    quantity?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    unitPrice?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    totalPrice?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    createdAt?: DateTimeWithAggregatesFilter<"InvoiceLine"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutCreatorInput
    requirements?: RequirementSubmissionCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatorInput
    requirements?: RequirementSubmissionUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutCreatorNestedInput
    requirements?: RequirementSubmissionUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatorNestedInput
    requirements?: RequirementSubmissionUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    businessName?: string | null
    industry?: string | null
    phoneNumber?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutClientInput
    projects?: ProjectCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    userId: string
    businessName?: string | null
    industry?: string | null
    phoneNumber?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClientNestedInput
    projects?: ProjectUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    userId: string
    businessName?: string | null
    industry?: string | null
    phoneNumber?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutProjectsInput
    client?: ClientCreateNestedOneWithoutProjectsInput
    stages?: ProjectStageCreateNestedManyWithoutProjectInput
    costs?: MaterialCostCreateNestedManyWithoutProjectInput
    documents?: DocumentCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    clientId?: string | null
    stages?: ProjectStageUncheckedCreateNestedManyWithoutProjectInput
    costs?: MaterialCostUncheckedCreateNestedManyWithoutProjectInput
    documents?: DocumentUncheckedCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutProjectsNestedInput
    client?: ClientUpdateOneWithoutProjectsNestedInput
    stages?: ProjectStageUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUpdateManyWithoutProjectNestedInput
    documents?: DocumentUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    stages?: ProjectStageUncheckedUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUncheckedUpdateManyWithoutProjectNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    clientId?: string | null
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectStageCreateInput = {
    id?: string
    stageName: string
    status?: string
    order: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutStagesInput
  }

  export type ProjectStageUncheckedCreateInput = {
    id?: string
    projectId: string
    stageName: string
    status?: string
    order: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectStageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stageName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutStagesNestedInput
  }

  export type ProjectStageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    stageName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStageCreateManyInput = {
    id?: string
    projectId: string
    stageName: string
    status?: string
    order: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectStageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stageName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    stageName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCostCreateInput = {
    id?: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutCostsInput
    invoice?: SupplierInvoiceCreateNestedOneWithoutMaterialCostsInput
  }

  export type MaterialCostUncheckedCreateInput = {
    id?: string
    projectId: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialCostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutCostsNestedInput
    invoice?: SupplierInvoiceUpdateOneWithoutMaterialCostsNestedInput
  }

  export type MaterialCostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCostCreateManyInput = {
    id?: string
    projectId: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialCostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierInvoiceCreateInput = {
    id?: string
    invoiceNumber: string
    supplier: string
    totalAmount: number
    taxAmount: number
    netAmount: number
    currency?: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    status?: string
    uploadedFileUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    materialCosts?: MaterialCostCreateNestedManyWithoutInvoiceInput
  }

  export type SupplierInvoiceUncheckedCreateInput = {
    id?: string
    invoiceNumber: string
    supplier: string
    totalAmount: number
    taxAmount: number
    netAmount: number
    currency?: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    status?: string
    uploadedFileUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    materialCosts?: MaterialCostUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type SupplierInvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    supplier?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    materialCosts?: MaterialCostUpdateManyWithoutInvoiceNestedInput
  }

  export type SupplierInvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    supplier?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    materialCosts?: MaterialCostUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type SupplierInvoiceCreateManyInput = {
    id?: string
    invoiceNumber: string
    supplier: string
    totalAmount: number
    taxAmount: number
    netAmount: number
    currency?: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    status?: string
    uploadedFileUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierInvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    supplier?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierInvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    supplier?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl?: string | null
    uploadedAt?: Date | string
    isPublic?: boolean
    project: ProjectCreateNestedOneWithoutDocumentsInput
    generations?: DocumentGenerationCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    projectId: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl?: string | null
    uploadedAt?: Date | string
    isPublic?: boolean
    generations?: DocumentGenerationUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    project?: ProjectUpdateOneRequiredWithoutDocumentsNestedInput
    generations?: DocumentGenerationUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    generations?: DocumentGenerationUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    projectId: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl?: string | null
    uploadedAt?: Date | string
    isPublic?: boolean
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentGenerationCreateInput = {
    id?: string
    documentType: string
    documentNumber: string
    templateData: string
    status?: string
    generatedBy?: string | null
    autoSend?: boolean
    recipientEmail?: string | null
    emailSent?: boolean
    emailSentAt?: Date | string | null
    fileUrl?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    document: DocumentCreateNestedOneWithoutGenerationsInput
  }

  export type DocumentGenerationUncheckedCreateInput = {
    id?: string
    documentId: string
    documentType: string
    documentNumber: string
    templateData: string
    status?: string
    generatedBy?: string | null
    autoSend?: boolean
    recipientEmail?: string | null
    emailSent?: boolean
    emailSentAt?: Date | string | null
    fileUrl?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentGenerationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    templateData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    autoSend?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutGenerationsNestedInput
  }

  export type DocumentGenerationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    templateData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    autoSend?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentGenerationCreateManyInput = {
    id?: string
    documentId: string
    documentType: string
    documentNumber: string
    templateData: string
    status?: string
    generatedBy?: string | null
    autoSend?: boolean
    recipientEmail?: string | null
    emailSent?: boolean
    emailSentAt?: Date | string | null
    fileUrl?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentGenerationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    templateData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    autoSend?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentGenerationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    templateData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    autoSend?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    role: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    userId: string
    content: string
    role: string
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    userId: string
    content: string
    role: string
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequirementSubmissionCreateInput = {
    id?: string
    projectType: string
    urgency: string
    budget: string
    requirements: string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutRequirementsInput
  }

  export type RequirementSubmissionUncheckedCreateInput = {
    id?: string
    userId?: string | null
    projectType: string
    urgency: string
    budget: string
    requirements: string
    createdAt?: Date | string
  }

  export type RequirementSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectType?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    budget?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRequirementsNestedInput
  }

  export type RequirementSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    budget?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequirementSubmissionCreateManyInput = {
    id?: string
    userId?: string | null
    projectType: string
    urgency: string
    budget: string
    requirements: string
    createdAt?: Date | string
  }

  export type RequirementSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectType?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    budget?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequirementSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    budget?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceLineCreateInput = {
    id?: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutInvoiceLinesInput
  }

  export type InvoiceLineUncheckedCreateInput = {
    id?: string
    projectId: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type InvoiceLineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutInvoiceLinesNestedInput
  }

  export type InvoiceLineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceLineCreateManyInput = {
    id?: string
    projectId: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type InvoiceLineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceLineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type RequirementSubmissionListRelationFilter = {
    every?: RequirementSubmissionWhereInput
    some?: RequirementSubmissionWhereInput
    none?: RequirementSubmissionWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type ClientNullableScalarRelationFilter = {
    is?: ClientWhereInput | null
    isNot?: ClientWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RequirementSubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    industry?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    industry?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    industry?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ProjectStageListRelationFilter = {
    every?: ProjectStageWhereInput
    some?: ProjectStageWhereInput
    none?: ProjectStageWhereInput
  }

  export type MaterialCostListRelationFilter = {
    every?: MaterialCostWhereInput
    some?: MaterialCostWhereInput
    none?: MaterialCostWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type InvoiceLineListRelationFilter = {
    every?: InvoiceLineWhereInput
    some?: InvoiceLineWhereInput
    none?: InvoiceLineWhereInput
  }

  export type ProjectStageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaterialCostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceLineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    projectRef?: SortOrder
    name?: SortOrder
    description?: SortOrder
    service?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrder
    actualHours?: SortOrder
    quoteAmount?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    targetDate?: SortOrder
    completedDate?: SortOrder
    currentStage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    clientId?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    estimatedHours?: SortOrder
    actualHours?: SortOrder
    quoteAmount?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    projectRef?: SortOrder
    name?: SortOrder
    description?: SortOrder
    service?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrder
    actualHours?: SortOrder
    quoteAmount?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    targetDate?: SortOrder
    completedDate?: SortOrder
    currentStage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    clientId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    projectRef?: SortOrder
    name?: SortOrder
    description?: SortOrder
    service?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrder
    actualHours?: SortOrder
    quoteAmount?: SortOrder
    location?: SortOrder
    startDate?: SortOrder
    targetDate?: SortOrder
    completedDate?: SortOrder
    currentStage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    clientId?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    estimatedHours?: SortOrder
    actualHours?: SortOrder
    quoteAmount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectStageCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    stageName?: SortOrder
    status?: SortOrder
    order?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectStageAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ProjectStageMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    stageName?: SortOrder
    status?: SortOrder
    order?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectStageMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    stageName?: SortOrder
    status?: SortOrder
    order?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectStageSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SupplierInvoiceNullableScalarRelationFilter = {
    is?: SupplierInvoiceWhereInput | null
    isNot?: SupplierInvoiceWhereInput | null
  }

  export type MaterialCostCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    material?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrder
    category?: SortOrder
    date?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialCostAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalCost?: SortOrder
  }

  export type MaterialCostMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    material?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrder
    category?: SortOrder
    date?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialCostMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    material?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalCost?: SortOrder
    supplier?: SortOrder
    category?: SortOrder
    date?: SortOrder
    invoiceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialCostSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalCost?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SupplierInvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    supplier?: SortOrder
    totalAmount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    currency?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    uploadedFileUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierInvoiceAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
  }

  export type SupplierInvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    supplier?: SortOrder
    totalAmount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    currency?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    uploadedFileUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierInvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    supplier?: SortOrder
    totalAmount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
    currency?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    uploadedFileUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierInvoiceSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    taxAmount?: SortOrder
    netAmount?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DocumentGenerationListRelationFilter = {
    every?: DocumentGenerationWhereInput
    some?: DocumentGenerationWhereInput
    none?: DocumentGenerationWhereInput
  }

  export type DocumentGenerationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    fileUrl?: SortOrder
    uploadedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    fileUrl?: SortOrder
    uploadedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    fileUrl?: SortOrder
    uploadedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type DocumentGenerationCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    templateData?: SortOrder
    status?: SortOrder
    generatedBy?: SortOrder
    autoSend?: SortOrder
    recipientEmail?: SortOrder
    emailSent?: SortOrder
    emailSentAt?: SortOrder
    fileUrl?: SortOrder
    generatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentGenerationMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    templateData?: SortOrder
    status?: SortOrder
    generatedBy?: SortOrder
    autoSend?: SortOrder
    recipientEmail?: SortOrder
    emailSent?: SortOrder
    emailSentAt?: SortOrder
    fileUrl?: SortOrder
    generatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentGenerationMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    templateData?: SortOrder
    status?: SortOrder
    generatedBy?: SortOrder
    autoSend?: SortOrder
    recipientEmail?: SortOrder
    emailSent?: SortOrder
    emailSentAt?: SortOrder
    fileUrl?: SortOrder
    generatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type RequirementSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projectType?: SortOrder
    urgency?: SortOrder
    budget?: SortOrder
    requirements?: SortOrder
    createdAt?: SortOrder
  }

  export type RequirementSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projectType?: SortOrder
    urgency?: SortOrder
    budget?: SortOrder
    requirements?: SortOrder
    createdAt?: SortOrder
  }

  export type RequirementSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projectType?: SortOrder
    urgency?: SortOrder
    budget?: SortOrder
    requirements?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoiceLineCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoiceLineAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type InvoiceLineMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoiceLineMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoiceLineSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type MessageCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ProjectCreateWithoutCreatorInput, ProjectUncheckedCreateWithoutCreatorInput> | ProjectCreateWithoutCreatorInput[] | ProjectUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatorInput | ProjectCreateOrConnectWithoutCreatorInput[]
    createMany?: ProjectCreateManyCreatorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type RequirementSubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<RequirementSubmissionCreateWithoutUserInput, RequirementSubmissionUncheckedCreateWithoutUserInput> | RequirementSubmissionCreateWithoutUserInput[] | RequirementSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RequirementSubmissionCreateOrConnectWithoutUserInput | RequirementSubmissionCreateOrConnectWithoutUserInput[]
    createMany?: RequirementSubmissionCreateManyUserInputEnvelope
    connect?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ClientCreateNestedOneWithoutUserInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    connect?: ClientWhereUniqueInput
  }

  export type MessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ProjectCreateWithoutCreatorInput, ProjectUncheckedCreateWithoutCreatorInput> | ProjectCreateWithoutCreatorInput[] | ProjectUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatorInput | ProjectCreateOrConnectWithoutCreatorInput[]
    createMany?: ProjectCreateManyCreatorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type RequirementSubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RequirementSubmissionCreateWithoutUserInput, RequirementSubmissionUncheckedCreateWithoutUserInput> | RequirementSubmissionCreateWithoutUserInput[] | RequirementSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RequirementSubmissionCreateOrConnectWithoutUserInput | RequirementSubmissionCreateOrConnectWithoutUserInput[]
    createMany?: RequirementSubmissionCreateManyUserInputEnvelope
    connect?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    connect?: ClientWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ProjectCreateWithoutCreatorInput, ProjectUncheckedCreateWithoutCreatorInput> | ProjectCreateWithoutCreatorInput[] | ProjectUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatorInput | ProjectCreateOrConnectWithoutCreatorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCreatorInput | ProjectUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ProjectCreateManyCreatorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCreatorInput | ProjectUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCreatorInput | ProjectUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type RequirementSubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<RequirementSubmissionCreateWithoutUserInput, RequirementSubmissionUncheckedCreateWithoutUserInput> | RequirementSubmissionCreateWithoutUserInput[] | RequirementSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RequirementSubmissionCreateOrConnectWithoutUserInput | RequirementSubmissionCreateOrConnectWithoutUserInput[]
    upsert?: RequirementSubmissionUpsertWithWhereUniqueWithoutUserInput | RequirementSubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RequirementSubmissionCreateManyUserInputEnvelope
    set?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
    disconnect?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
    delete?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
    connect?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
    update?: RequirementSubmissionUpdateWithWhereUniqueWithoutUserInput | RequirementSubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RequirementSubmissionUpdateManyWithWhereWithoutUserInput | RequirementSubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RequirementSubmissionScalarWhereInput | RequirementSubmissionScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ClientUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    upsert?: ClientUpsertWithoutUserInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutUserInput, ClientUpdateWithoutUserInput>, ClientUncheckedUpdateWithoutUserInput>
  }

  export type MessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ProjectCreateWithoutCreatorInput, ProjectUncheckedCreateWithoutCreatorInput> | ProjectCreateWithoutCreatorInput[] | ProjectUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatorInput | ProjectCreateOrConnectWithoutCreatorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCreatorInput | ProjectUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ProjectCreateManyCreatorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCreatorInput | ProjectUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCreatorInput | ProjectUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type RequirementSubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RequirementSubmissionCreateWithoutUserInput, RequirementSubmissionUncheckedCreateWithoutUserInput> | RequirementSubmissionCreateWithoutUserInput[] | RequirementSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RequirementSubmissionCreateOrConnectWithoutUserInput | RequirementSubmissionCreateOrConnectWithoutUserInput[]
    upsert?: RequirementSubmissionUpsertWithWhereUniqueWithoutUserInput | RequirementSubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RequirementSubmissionCreateManyUserInputEnvelope
    set?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
    disconnect?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
    delete?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
    connect?: RequirementSubmissionWhereUniqueInput | RequirementSubmissionWhereUniqueInput[]
    update?: RequirementSubmissionUpdateWithWhereUniqueWithoutUserInput | RequirementSubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RequirementSubmissionUpdateManyWithWhereWithoutUserInput | RequirementSubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RequirementSubmissionScalarWhereInput | RequirementSubmissionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ClientUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    upsert?: ClientUpsertWithoutUserInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutUserInput, ClientUpdateWithoutUserInput>, ClientUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutClientInput = {
    create?: XOR<UserCreateWithoutClientInput, UserUncheckedCreateWithoutClientInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedManyWithoutClientInput = {
    create?: XOR<ProjectCreateWithoutClientInput, ProjectUncheckedCreateWithoutClientInput> | ProjectCreateWithoutClientInput[] | ProjectUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutClientInput | ProjectCreateOrConnectWithoutClientInput[]
    createMany?: ProjectCreateManyClientInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<ProjectCreateWithoutClientInput, ProjectUncheckedCreateWithoutClientInput> | ProjectCreateWithoutClientInput[] | ProjectUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutClientInput | ProjectCreateOrConnectWithoutClientInput[]
    createMany?: ProjectCreateManyClientInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutClientNestedInput = {
    create?: XOR<UserCreateWithoutClientInput, UserUncheckedCreateWithoutClientInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientInput
    upsert?: UserUpsertWithoutClientInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientInput, UserUpdateWithoutClientInput>, UserUncheckedUpdateWithoutClientInput>
  }

  export type ProjectUpdateManyWithoutClientNestedInput = {
    create?: XOR<ProjectCreateWithoutClientInput, ProjectUncheckedCreateWithoutClientInput> | ProjectCreateWithoutClientInput[] | ProjectUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutClientInput | ProjectCreateOrConnectWithoutClientInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutClientInput | ProjectUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ProjectCreateManyClientInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutClientInput | ProjectUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutClientInput | ProjectUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<ProjectCreateWithoutClientInput, ProjectUncheckedCreateWithoutClientInput> | ProjectCreateWithoutClientInput[] | ProjectUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutClientInput | ProjectCreateOrConnectWithoutClientInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutClientInput | ProjectUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ProjectCreateManyClientInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutClientInput | ProjectUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutClientInput | ProjectUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutProjectsInput = {
    create?: XOR<ClientCreateWithoutProjectsInput, ClientUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutProjectsInput
    connect?: ClientWhereUniqueInput
  }

  export type ProjectStageCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectStageCreateWithoutProjectInput, ProjectStageUncheckedCreateWithoutProjectInput> | ProjectStageCreateWithoutProjectInput[] | ProjectStageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStageCreateOrConnectWithoutProjectInput | ProjectStageCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectStageCreateManyProjectInputEnvelope
    connect?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
  }

  export type MaterialCostCreateNestedManyWithoutProjectInput = {
    create?: XOR<MaterialCostCreateWithoutProjectInput, MaterialCostUncheckedCreateWithoutProjectInput> | MaterialCostCreateWithoutProjectInput[] | MaterialCostUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MaterialCostCreateOrConnectWithoutProjectInput | MaterialCostCreateOrConnectWithoutProjectInput[]
    createMany?: MaterialCostCreateManyProjectInputEnvelope
    connect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutProjectInput = {
    create?: XOR<DocumentCreateWithoutProjectInput, DocumentUncheckedCreateWithoutProjectInput> | DocumentCreateWithoutProjectInput[] | DocumentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutProjectInput | DocumentCreateOrConnectWithoutProjectInput[]
    createMany?: DocumentCreateManyProjectInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type InvoiceLineCreateNestedManyWithoutProjectInput = {
    create?: XOR<InvoiceLineCreateWithoutProjectInput, InvoiceLineUncheckedCreateWithoutProjectInput> | InvoiceLineCreateWithoutProjectInput[] | InvoiceLineUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutProjectInput | InvoiceLineCreateOrConnectWithoutProjectInput[]
    createMany?: InvoiceLineCreateManyProjectInputEnvelope
    connect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
  }

  export type ProjectStageUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectStageCreateWithoutProjectInput, ProjectStageUncheckedCreateWithoutProjectInput> | ProjectStageCreateWithoutProjectInput[] | ProjectStageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStageCreateOrConnectWithoutProjectInput | ProjectStageCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectStageCreateManyProjectInputEnvelope
    connect?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
  }

  export type MaterialCostUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<MaterialCostCreateWithoutProjectInput, MaterialCostUncheckedCreateWithoutProjectInput> | MaterialCostCreateWithoutProjectInput[] | MaterialCostUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MaterialCostCreateOrConnectWithoutProjectInput | MaterialCostCreateOrConnectWithoutProjectInput[]
    createMany?: MaterialCostCreateManyProjectInputEnvelope
    connect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<DocumentCreateWithoutProjectInput, DocumentUncheckedCreateWithoutProjectInput> | DocumentCreateWithoutProjectInput[] | DocumentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutProjectInput | DocumentCreateOrConnectWithoutProjectInput[]
    createMany?: DocumentCreateManyProjectInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type InvoiceLineUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<InvoiceLineCreateWithoutProjectInput, InvoiceLineUncheckedCreateWithoutProjectInput> | InvoiceLineCreateWithoutProjectInput[] | InvoiceLineUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutProjectInput | InvoiceLineCreateOrConnectWithoutProjectInput[]
    createMany?: InvoiceLineCreateManyProjectInputEnvelope
    connect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ClientUpdateOneWithoutProjectsNestedInput = {
    create?: XOR<ClientCreateWithoutProjectsInput, ClientUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutProjectsInput
    upsert?: ClientUpsertWithoutProjectsInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutProjectsInput, ClientUpdateWithoutProjectsInput>, ClientUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectStageUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectStageCreateWithoutProjectInput, ProjectStageUncheckedCreateWithoutProjectInput> | ProjectStageCreateWithoutProjectInput[] | ProjectStageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStageCreateOrConnectWithoutProjectInput | ProjectStageCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectStageUpsertWithWhereUniqueWithoutProjectInput | ProjectStageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectStageCreateManyProjectInputEnvelope
    set?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
    disconnect?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
    delete?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
    connect?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
    update?: ProjectStageUpdateWithWhereUniqueWithoutProjectInput | ProjectStageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectStageUpdateManyWithWhereWithoutProjectInput | ProjectStageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectStageScalarWhereInput | ProjectStageScalarWhereInput[]
  }

  export type MaterialCostUpdateManyWithoutProjectNestedInput = {
    create?: XOR<MaterialCostCreateWithoutProjectInput, MaterialCostUncheckedCreateWithoutProjectInput> | MaterialCostCreateWithoutProjectInput[] | MaterialCostUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MaterialCostCreateOrConnectWithoutProjectInput | MaterialCostCreateOrConnectWithoutProjectInput[]
    upsert?: MaterialCostUpsertWithWhereUniqueWithoutProjectInput | MaterialCostUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: MaterialCostCreateManyProjectInputEnvelope
    set?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    disconnect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    delete?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    connect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    update?: MaterialCostUpdateWithWhereUniqueWithoutProjectInput | MaterialCostUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: MaterialCostUpdateManyWithWhereWithoutProjectInput | MaterialCostUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: MaterialCostScalarWhereInput | MaterialCostScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DocumentCreateWithoutProjectInput, DocumentUncheckedCreateWithoutProjectInput> | DocumentCreateWithoutProjectInput[] | DocumentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutProjectInput | DocumentCreateOrConnectWithoutProjectInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutProjectInput | DocumentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DocumentCreateManyProjectInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutProjectInput | DocumentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutProjectInput | DocumentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type InvoiceLineUpdateManyWithoutProjectNestedInput = {
    create?: XOR<InvoiceLineCreateWithoutProjectInput, InvoiceLineUncheckedCreateWithoutProjectInput> | InvoiceLineCreateWithoutProjectInput[] | InvoiceLineUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutProjectInput | InvoiceLineCreateOrConnectWithoutProjectInput[]
    upsert?: InvoiceLineUpsertWithWhereUniqueWithoutProjectInput | InvoiceLineUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: InvoiceLineCreateManyProjectInputEnvelope
    set?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    disconnect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    delete?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    connect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    update?: InvoiceLineUpdateWithWhereUniqueWithoutProjectInput | InvoiceLineUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: InvoiceLineUpdateManyWithWhereWithoutProjectInput | InvoiceLineUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: InvoiceLineScalarWhereInput | InvoiceLineScalarWhereInput[]
  }

  export type ProjectStageUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectStageCreateWithoutProjectInput, ProjectStageUncheckedCreateWithoutProjectInput> | ProjectStageCreateWithoutProjectInput[] | ProjectStageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStageCreateOrConnectWithoutProjectInput | ProjectStageCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectStageUpsertWithWhereUniqueWithoutProjectInput | ProjectStageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectStageCreateManyProjectInputEnvelope
    set?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
    disconnect?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
    delete?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
    connect?: ProjectStageWhereUniqueInput | ProjectStageWhereUniqueInput[]
    update?: ProjectStageUpdateWithWhereUniqueWithoutProjectInput | ProjectStageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectStageUpdateManyWithWhereWithoutProjectInput | ProjectStageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectStageScalarWhereInput | ProjectStageScalarWhereInput[]
  }

  export type MaterialCostUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<MaterialCostCreateWithoutProjectInput, MaterialCostUncheckedCreateWithoutProjectInput> | MaterialCostCreateWithoutProjectInput[] | MaterialCostUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MaterialCostCreateOrConnectWithoutProjectInput | MaterialCostCreateOrConnectWithoutProjectInput[]
    upsert?: MaterialCostUpsertWithWhereUniqueWithoutProjectInput | MaterialCostUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: MaterialCostCreateManyProjectInputEnvelope
    set?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    disconnect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    delete?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    connect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    update?: MaterialCostUpdateWithWhereUniqueWithoutProjectInput | MaterialCostUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: MaterialCostUpdateManyWithWhereWithoutProjectInput | MaterialCostUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: MaterialCostScalarWhereInput | MaterialCostScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DocumentCreateWithoutProjectInput, DocumentUncheckedCreateWithoutProjectInput> | DocumentCreateWithoutProjectInput[] | DocumentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutProjectInput | DocumentCreateOrConnectWithoutProjectInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutProjectInput | DocumentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DocumentCreateManyProjectInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutProjectInput | DocumentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutProjectInput | DocumentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type InvoiceLineUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<InvoiceLineCreateWithoutProjectInput, InvoiceLineUncheckedCreateWithoutProjectInput> | InvoiceLineCreateWithoutProjectInput[] | InvoiceLineUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutProjectInput | InvoiceLineCreateOrConnectWithoutProjectInput[]
    upsert?: InvoiceLineUpsertWithWhereUniqueWithoutProjectInput | InvoiceLineUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: InvoiceLineCreateManyProjectInputEnvelope
    set?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    disconnect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    delete?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    connect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    update?: InvoiceLineUpdateWithWhereUniqueWithoutProjectInput | InvoiceLineUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: InvoiceLineUpdateManyWithWhereWithoutProjectInput | InvoiceLineUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: InvoiceLineScalarWhereInput | InvoiceLineScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutStagesInput = {
    create?: XOR<ProjectCreateWithoutStagesInput, ProjectUncheckedCreateWithoutStagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutStagesInput
    connect?: ProjectWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutStagesNestedInput = {
    create?: XOR<ProjectCreateWithoutStagesInput, ProjectUncheckedCreateWithoutStagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutStagesInput
    upsert?: ProjectUpsertWithoutStagesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutStagesInput, ProjectUpdateWithoutStagesInput>, ProjectUncheckedUpdateWithoutStagesInput>
  }

  export type ProjectCreateNestedOneWithoutCostsInput = {
    create?: XOR<ProjectCreateWithoutCostsInput, ProjectUncheckedCreateWithoutCostsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCostsInput
    connect?: ProjectWhereUniqueInput
  }

  export type SupplierInvoiceCreateNestedOneWithoutMaterialCostsInput = {
    create?: XOR<SupplierInvoiceCreateWithoutMaterialCostsInput, SupplierInvoiceUncheckedCreateWithoutMaterialCostsInput>
    connectOrCreate?: SupplierInvoiceCreateOrConnectWithoutMaterialCostsInput
    connect?: SupplierInvoiceWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutCostsNestedInput = {
    create?: XOR<ProjectCreateWithoutCostsInput, ProjectUncheckedCreateWithoutCostsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCostsInput
    upsert?: ProjectUpsertWithoutCostsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutCostsInput, ProjectUpdateWithoutCostsInput>, ProjectUncheckedUpdateWithoutCostsInput>
  }

  export type SupplierInvoiceUpdateOneWithoutMaterialCostsNestedInput = {
    create?: XOR<SupplierInvoiceCreateWithoutMaterialCostsInput, SupplierInvoiceUncheckedCreateWithoutMaterialCostsInput>
    connectOrCreate?: SupplierInvoiceCreateOrConnectWithoutMaterialCostsInput
    upsert?: SupplierInvoiceUpsertWithoutMaterialCostsInput
    disconnect?: SupplierInvoiceWhereInput | boolean
    delete?: SupplierInvoiceWhereInput | boolean
    connect?: SupplierInvoiceWhereUniqueInput
    update?: XOR<XOR<SupplierInvoiceUpdateToOneWithWhereWithoutMaterialCostsInput, SupplierInvoiceUpdateWithoutMaterialCostsInput>, SupplierInvoiceUncheckedUpdateWithoutMaterialCostsInput>
  }

  export type MaterialCostCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<MaterialCostCreateWithoutInvoiceInput, MaterialCostUncheckedCreateWithoutInvoiceInput> | MaterialCostCreateWithoutInvoiceInput[] | MaterialCostUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: MaterialCostCreateOrConnectWithoutInvoiceInput | MaterialCostCreateOrConnectWithoutInvoiceInput[]
    createMany?: MaterialCostCreateManyInvoiceInputEnvelope
    connect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
  }

  export type MaterialCostUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<MaterialCostCreateWithoutInvoiceInput, MaterialCostUncheckedCreateWithoutInvoiceInput> | MaterialCostCreateWithoutInvoiceInput[] | MaterialCostUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: MaterialCostCreateOrConnectWithoutInvoiceInput | MaterialCostCreateOrConnectWithoutInvoiceInput[]
    createMany?: MaterialCostCreateManyInvoiceInputEnvelope
    connect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
  }

  export type MaterialCostUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<MaterialCostCreateWithoutInvoiceInput, MaterialCostUncheckedCreateWithoutInvoiceInput> | MaterialCostCreateWithoutInvoiceInput[] | MaterialCostUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: MaterialCostCreateOrConnectWithoutInvoiceInput | MaterialCostCreateOrConnectWithoutInvoiceInput[]
    upsert?: MaterialCostUpsertWithWhereUniqueWithoutInvoiceInput | MaterialCostUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: MaterialCostCreateManyInvoiceInputEnvelope
    set?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    disconnect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    delete?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    connect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    update?: MaterialCostUpdateWithWhereUniqueWithoutInvoiceInput | MaterialCostUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: MaterialCostUpdateManyWithWhereWithoutInvoiceInput | MaterialCostUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: MaterialCostScalarWhereInput | MaterialCostScalarWhereInput[]
  }

  export type MaterialCostUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<MaterialCostCreateWithoutInvoiceInput, MaterialCostUncheckedCreateWithoutInvoiceInput> | MaterialCostCreateWithoutInvoiceInput[] | MaterialCostUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: MaterialCostCreateOrConnectWithoutInvoiceInput | MaterialCostCreateOrConnectWithoutInvoiceInput[]
    upsert?: MaterialCostUpsertWithWhereUniqueWithoutInvoiceInput | MaterialCostUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: MaterialCostCreateManyInvoiceInputEnvelope
    set?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    disconnect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    delete?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    connect?: MaterialCostWhereUniqueInput | MaterialCostWhereUniqueInput[]
    update?: MaterialCostUpdateWithWhereUniqueWithoutInvoiceInput | MaterialCostUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: MaterialCostUpdateManyWithWhereWithoutInvoiceInput | MaterialCostUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: MaterialCostScalarWhereInput | MaterialCostScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<ProjectCreateWithoutDocumentsInput, ProjectUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDocumentsInput
    connect?: ProjectWhereUniqueInput
  }

  export type DocumentGenerationCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentGenerationCreateWithoutDocumentInput, DocumentGenerationUncheckedCreateWithoutDocumentInput> | DocumentGenerationCreateWithoutDocumentInput[] | DocumentGenerationUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentGenerationCreateOrConnectWithoutDocumentInput | DocumentGenerationCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentGenerationCreateManyDocumentInputEnvelope
    connect?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
  }

  export type DocumentGenerationUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentGenerationCreateWithoutDocumentInput, DocumentGenerationUncheckedCreateWithoutDocumentInput> | DocumentGenerationCreateWithoutDocumentInput[] | DocumentGenerationUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentGenerationCreateOrConnectWithoutDocumentInput | DocumentGenerationCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentGenerationCreateManyDocumentInputEnvelope
    connect?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProjectUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<ProjectCreateWithoutDocumentsInput, ProjectUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDocumentsInput
    upsert?: ProjectUpsertWithoutDocumentsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutDocumentsInput, ProjectUpdateWithoutDocumentsInput>, ProjectUncheckedUpdateWithoutDocumentsInput>
  }

  export type DocumentGenerationUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentGenerationCreateWithoutDocumentInput, DocumentGenerationUncheckedCreateWithoutDocumentInput> | DocumentGenerationCreateWithoutDocumentInput[] | DocumentGenerationUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentGenerationCreateOrConnectWithoutDocumentInput | DocumentGenerationCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentGenerationUpsertWithWhereUniqueWithoutDocumentInput | DocumentGenerationUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentGenerationCreateManyDocumentInputEnvelope
    set?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
    disconnect?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
    delete?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
    connect?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
    update?: DocumentGenerationUpdateWithWhereUniqueWithoutDocumentInput | DocumentGenerationUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentGenerationUpdateManyWithWhereWithoutDocumentInput | DocumentGenerationUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentGenerationScalarWhereInput | DocumentGenerationScalarWhereInput[]
  }

  export type DocumentGenerationUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentGenerationCreateWithoutDocumentInput, DocumentGenerationUncheckedCreateWithoutDocumentInput> | DocumentGenerationCreateWithoutDocumentInput[] | DocumentGenerationUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentGenerationCreateOrConnectWithoutDocumentInput | DocumentGenerationCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentGenerationUpsertWithWhereUniqueWithoutDocumentInput | DocumentGenerationUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentGenerationCreateManyDocumentInputEnvelope
    set?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
    disconnect?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
    delete?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
    connect?: DocumentGenerationWhereUniqueInput | DocumentGenerationWhereUniqueInput[]
    update?: DocumentGenerationUpdateWithWhereUniqueWithoutDocumentInput | DocumentGenerationUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentGenerationUpdateManyWithWhereWithoutDocumentInput | DocumentGenerationUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentGenerationScalarWhereInput | DocumentGenerationScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutGenerationsInput = {
    create?: XOR<DocumentCreateWithoutGenerationsInput, DocumentUncheckedCreateWithoutGenerationsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutGenerationsInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutGenerationsNestedInput = {
    create?: XOR<DocumentCreateWithoutGenerationsInput, DocumentUncheckedCreateWithoutGenerationsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutGenerationsInput
    upsert?: DocumentUpsertWithoutGenerationsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutGenerationsInput, DocumentUpdateWithoutGenerationsInput>, DocumentUncheckedUpdateWithoutGenerationsInput>
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserCreateNestedOneWithoutRequirementsInput = {
    create?: XOR<UserCreateWithoutRequirementsInput, UserUncheckedCreateWithoutRequirementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRequirementsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutRequirementsNestedInput = {
    create?: XOR<UserCreateWithoutRequirementsInput, UserUncheckedCreateWithoutRequirementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRequirementsInput
    upsert?: UserUpsertWithoutRequirementsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRequirementsInput, UserUpdateWithoutRequirementsInput>, UserUncheckedUpdateWithoutRequirementsInput>
  }

  export type ProjectCreateNestedOneWithoutInvoiceLinesInput = {
    create?: XOR<ProjectCreateWithoutInvoiceLinesInput, ProjectUncheckedCreateWithoutInvoiceLinesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInvoiceLinesInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutInvoiceLinesNestedInput = {
    create?: XOR<ProjectCreateWithoutInvoiceLinesInput, ProjectUncheckedCreateWithoutInvoiceLinesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInvoiceLinesInput
    upsert?: ProjectUpsertWithoutInvoiceLinesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutInvoiceLinesInput, ProjectUpdateWithoutInvoiceLinesInput>, ProjectUncheckedUpdateWithoutInvoiceLinesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MessageCreateWithoutUserInput = {
    id?: string
    content: string
    role: string
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutUserInput = {
    id?: string
    content: string
    role: string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutUserInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageCreateManyUserInputEnvelope = {
    data: MessageCreateManyUserInput | MessageCreateManyUserInput[]
  }

  export type ProjectCreateWithoutCreatorInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: ClientCreateNestedOneWithoutProjectsInput
    stages?: ProjectStageCreateNestedManyWithoutProjectInput
    costs?: MaterialCostCreateNestedManyWithoutProjectInput
    documents?: DocumentCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutCreatorInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId?: string | null
    stages?: ProjectStageUncheckedCreateNestedManyWithoutProjectInput
    costs?: MaterialCostUncheckedCreateNestedManyWithoutProjectInput
    documents?: DocumentUncheckedCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCreatorInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCreatorInput, ProjectUncheckedCreateWithoutCreatorInput>
  }

  export type ProjectCreateManyCreatorInputEnvelope = {
    data: ProjectCreateManyCreatorInput | ProjectCreateManyCreatorInput[]
  }

  export type RequirementSubmissionCreateWithoutUserInput = {
    id?: string
    projectType: string
    urgency: string
    budget: string
    requirements: string
    createdAt?: Date | string
  }

  export type RequirementSubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    projectType: string
    urgency: string
    budget: string
    requirements: string
    createdAt?: Date | string
  }

  export type RequirementSubmissionCreateOrConnectWithoutUserInput = {
    where: RequirementSubmissionWhereUniqueInput
    create: XOR<RequirementSubmissionCreateWithoutUserInput, RequirementSubmissionUncheckedCreateWithoutUserInput>
  }

  export type RequirementSubmissionCreateManyUserInputEnvelope = {
    data: RequirementSubmissionCreateManyUserInput | RequirementSubmissionCreateManyUserInput[]
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
  }

  export type ClientCreateWithoutUserInput = {
    id?: string
    businessName?: string | null
    industry?: string | null
    phoneNumber?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutUserInput = {
    id?: string
    businessName?: string | null
    industry?: string | null
    phoneNumber?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutUserInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
  }

  export type MessageUpdateManyWithWhereWithoutUserInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutUserInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutCreatorInput, ProjectUncheckedUpdateWithoutCreatorInput>
    create: XOR<ProjectCreateWithoutCreatorInput, ProjectUncheckedCreateWithoutCreatorInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutCreatorInput, ProjectUncheckedUpdateWithoutCreatorInput>
  }

  export type ProjectUpdateManyWithWhereWithoutCreatorInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutCreatorInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    projectRef?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    service?: StringFilter<"Project"> | string
    status?: StringFilter<"Project"> | string
    priority?: StringFilter<"Project"> | string
    estimatedHours?: IntNullableFilter<"Project"> | number | null
    actualHours?: IntNullableFilter<"Project"> | number | null
    quoteAmount?: FloatNullableFilter<"Project"> | number | null
    location?: StringNullableFilter<"Project"> | string | null
    startDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    targetDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    currentStage?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdBy?: StringNullableFilter<"Project"> | string | null
    clientId?: StringNullableFilter<"Project"> | string | null
  }

  export type RequirementSubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: RequirementSubmissionWhereUniqueInput
    update: XOR<RequirementSubmissionUpdateWithoutUserInput, RequirementSubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<RequirementSubmissionCreateWithoutUserInput, RequirementSubmissionUncheckedCreateWithoutUserInput>
  }

  export type RequirementSubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: RequirementSubmissionWhereUniqueInput
    data: XOR<RequirementSubmissionUpdateWithoutUserInput, RequirementSubmissionUncheckedUpdateWithoutUserInput>
  }

  export type RequirementSubmissionUpdateManyWithWhereWithoutUserInput = {
    where: RequirementSubmissionScalarWhereInput
    data: XOR<RequirementSubmissionUpdateManyMutationInput, RequirementSubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type RequirementSubmissionScalarWhereInput = {
    AND?: RequirementSubmissionScalarWhereInput | RequirementSubmissionScalarWhereInput[]
    OR?: RequirementSubmissionScalarWhereInput[]
    NOT?: RequirementSubmissionScalarWhereInput | RequirementSubmissionScalarWhereInput[]
    id?: StringFilter<"RequirementSubmission"> | string
    userId?: StringNullableFilter<"RequirementSubmission"> | string | null
    projectType?: StringFilter<"RequirementSubmission"> | string
    urgency?: StringFilter<"RequirementSubmission"> | string
    budget?: StringFilter<"RequirementSubmission"> | string
    requirements?: StringFilter<"RequirementSubmission"> | string
    createdAt?: DateTimeFilter<"RequirementSubmission"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type ClientUpsertWithoutUserInput = {
    update: XOR<ClientUpdateWithoutUserInput, ClientUncheckedUpdateWithoutUserInput>
    create: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutUserInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutUserInput, ClientUncheckedUpdateWithoutUserInput>
  }

  export type ClientUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutCreatorInput
    requirements?: RequirementSubmissionCreateNestedManyWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatorInput
    requirements?: RequirementSubmissionUncheckedCreateNestedManyWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutCreatorNestedInput
    requirements?: RequirementSubmissionUpdateManyWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatorNestedInput
    requirements?: RequirementSubmissionUncheckedUpdateManyWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutClientInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutCreatorInput
    requirements?: RequirementSubmissionCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClientInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatorInput
    requirements?: RequirementSubmissionUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientInput, UserUncheckedCreateWithoutClientInput>
  }

  export type ProjectCreateWithoutClientInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutProjectsInput
    stages?: ProjectStageCreateNestedManyWithoutProjectInput
    costs?: MaterialCostCreateNestedManyWithoutProjectInput
    documents?: DocumentCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutClientInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    stages?: ProjectStageUncheckedCreateNestedManyWithoutProjectInput
    costs?: MaterialCostUncheckedCreateNestedManyWithoutProjectInput
    documents?: DocumentUncheckedCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutClientInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutClientInput, ProjectUncheckedCreateWithoutClientInput>
  }

  export type ProjectCreateManyClientInputEnvelope = {
    data: ProjectCreateManyClientInput | ProjectCreateManyClientInput[]
  }

  export type UserUpsertWithoutClientInput = {
    update: XOR<UserUpdateWithoutClientInput, UserUncheckedUpdateWithoutClientInput>
    create: XOR<UserCreateWithoutClientInput, UserUncheckedCreateWithoutClientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientInput, UserUncheckedUpdateWithoutClientInput>
  }

  export type UserUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutCreatorNestedInput
    requirements?: RequirementSubmissionUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatorNestedInput
    requirements?: RequirementSubmissionUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithWhereUniqueWithoutClientInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutClientInput, ProjectUncheckedUpdateWithoutClientInput>
    create: XOR<ProjectCreateWithoutClientInput, ProjectUncheckedCreateWithoutClientInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutClientInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutClientInput, ProjectUncheckedUpdateWithoutClientInput>
  }

  export type ProjectUpdateManyWithWhereWithoutClientInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutClientInput>
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutUserInput
    requirements?: RequirementSubmissionCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    requirements?: RequirementSubmissionUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ClientCreateWithoutProjectsInput = {
    id?: string
    businessName?: string | null
    industry?: string | null
    phoneNumber?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutProjectsInput = {
    id?: string
    userId: string
    businessName?: string | null
    industry?: string | null
    phoneNumber?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientCreateOrConnectWithoutProjectsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutProjectsInput, ClientUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectStageCreateWithoutProjectInput = {
    id?: string
    stageName: string
    status?: string
    order: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectStageUncheckedCreateWithoutProjectInput = {
    id?: string
    stageName: string
    status?: string
    order: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectStageCreateOrConnectWithoutProjectInput = {
    where: ProjectStageWhereUniqueInput
    create: XOR<ProjectStageCreateWithoutProjectInput, ProjectStageUncheckedCreateWithoutProjectInput>
  }

  export type ProjectStageCreateManyProjectInputEnvelope = {
    data: ProjectStageCreateManyProjectInput | ProjectStageCreateManyProjectInput[]
  }

  export type MaterialCostCreateWithoutProjectInput = {
    id?: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: SupplierInvoiceCreateNestedOneWithoutMaterialCostsInput
  }

  export type MaterialCostUncheckedCreateWithoutProjectInput = {
    id?: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialCostCreateOrConnectWithoutProjectInput = {
    where: MaterialCostWhereUniqueInput
    create: XOR<MaterialCostCreateWithoutProjectInput, MaterialCostUncheckedCreateWithoutProjectInput>
  }

  export type MaterialCostCreateManyProjectInputEnvelope = {
    data: MaterialCostCreateManyProjectInput | MaterialCostCreateManyProjectInput[]
  }

  export type DocumentCreateWithoutProjectInput = {
    id?: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl?: string | null
    uploadedAt?: Date | string
    isPublic?: boolean
    generations?: DocumentGenerationCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutProjectInput = {
    id?: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl?: string | null
    uploadedAt?: Date | string
    isPublic?: boolean
    generations?: DocumentGenerationUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutProjectInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutProjectInput, DocumentUncheckedCreateWithoutProjectInput>
  }

  export type DocumentCreateManyProjectInputEnvelope = {
    data: DocumentCreateManyProjectInput | DocumentCreateManyProjectInput[]
  }

  export type InvoiceLineCreateWithoutProjectInput = {
    id?: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type InvoiceLineUncheckedCreateWithoutProjectInput = {
    id?: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type InvoiceLineCreateOrConnectWithoutProjectInput = {
    where: InvoiceLineWhereUniqueInput
    create: XOR<InvoiceLineCreateWithoutProjectInput, InvoiceLineUncheckedCreateWithoutProjectInput>
  }

  export type InvoiceLineCreateManyProjectInputEnvelope = {
    data: InvoiceLineCreateManyProjectInput | InvoiceLineCreateManyProjectInput[]
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutUserNestedInput
    requirements?: RequirementSubmissionUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    requirements?: RequirementSubmissionUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ClientUpsertWithoutProjectsInput = {
    update: XOR<ClientUpdateWithoutProjectsInput, ClientUncheckedUpdateWithoutProjectsInput>
    create: XOR<ClientCreateWithoutProjectsInput, ClientUncheckedCreateWithoutProjectsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutProjectsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutProjectsInput, ClientUncheckedUpdateWithoutProjectsInput>
  }

  export type ClientUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStageUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectStageWhereUniqueInput
    update: XOR<ProjectStageUpdateWithoutProjectInput, ProjectStageUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectStageCreateWithoutProjectInput, ProjectStageUncheckedCreateWithoutProjectInput>
  }

  export type ProjectStageUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectStageWhereUniqueInput
    data: XOR<ProjectStageUpdateWithoutProjectInput, ProjectStageUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectStageUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectStageScalarWhereInput
    data: XOR<ProjectStageUpdateManyMutationInput, ProjectStageUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectStageScalarWhereInput = {
    AND?: ProjectStageScalarWhereInput | ProjectStageScalarWhereInput[]
    OR?: ProjectStageScalarWhereInput[]
    NOT?: ProjectStageScalarWhereInput | ProjectStageScalarWhereInput[]
    id?: StringFilter<"ProjectStage"> | string
    projectId?: StringFilter<"ProjectStage"> | string
    stageName?: StringFilter<"ProjectStage"> | string
    status?: StringFilter<"ProjectStage"> | string
    order?: IntFilter<"ProjectStage"> | number
    startedAt?: DateTimeNullableFilter<"ProjectStage"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"ProjectStage"> | Date | string | null
    notes?: StringNullableFilter<"ProjectStage"> | string | null
    createdAt?: DateTimeFilter<"ProjectStage"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectStage"> | Date | string
  }

  export type MaterialCostUpsertWithWhereUniqueWithoutProjectInput = {
    where: MaterialCostWhereUniqueInput
    update: XOR<MaterialCostUpdateWithoutProjectInput, MaterialCostUncheckedUpdateWithoutProjectInput>
    create: XOR<MaterialCostCreateWithoutProjectInput, MaterialCostUncheckedCreateWithoutProjectInput>
  }

  export type MaterialCostUpdateWithWhereUniqueWithoutProjectInput = {
    where: MaterialCostWhereUniqueInput
    data: XOR<MaterialCostUpdateWithoutProjectInput, MaterialCostUncheckedUpdateWithoutProjectInput>
  }

  export type MaterialCostUpdateManyWithWhereWithoutProjectInput = {
    where: MaterialCostScalarWhereInput
    data: XOR<MaterialCostUpdateManyMutationInput, MaterialCostUncheckedUpdateManyWithoutProjectInput>
  }

  export type MaterialCostScalarWhereInput = {
    AND?: MaterialCostScalarWhereInput | MaterialCostScalarWhereInput[]
    OR?: MaterialCostScalarWhereInput[]
    NOT?: MaterialCostScalarWhereInput | MaterialCostScalarWhereInput[]
    id?: StringFilter<"MaterialCost"> | string
    projectId?: StringFilter<"MaterialCost"> | string
    material?: StringFilter<"MaterialCost"> | string
    quantity?: FloatFilter<"MaterialCost"> | number
    unitPrice?: FloatFilter<"MaterialCost"> | number
    totalCost?: FloatFilter<"MaterialCost"> | number
    supplier?: StringNullableFilter<"MaterialCost"> | string | null
    category?: StringNullableFilter<"MaterialCost"> | string | null
    date?: DateTimeFilter<"MaterialCost"> | Date | string
    invoiceId?: StringNullableFilter<"MaterialCost"> | string | null
    createdAt?: DateTimeFilter<"MaterialCost"> | Date | string
    updatedAt?: DateTimeFilter<"MaterialCost"> | Date | string
  }

  export type DocumentUpsertWithWhereUniqueWithoutProjectInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutProjectInput, DocumentUncheckedUpdateWithoutProjectInput>
    create: XOR<DocumentCreateWithoutProjectInput, DocumentUncheckedCreateWithoutProjectInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutProjectInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutProjectInput, DocumentUncheckedUpdateWithoutProjectInput>
  }

  export type DocumentUpdateManyWithWhereWithoutProjectInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutProjectInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    projectId?: StringFilter<"Document"> | string
    filename?: StringFilter<"Document"> | string
    originalName?: StringFilter<"Document"> | string
    fileType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    fileUrl?: StringNullableFilter<"Document"> | string | null
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    isPublic?: BoolFilter<"Document"> | boolean
  }

  export type InvoiceLineUpsertWithWhereUniqueWithoutProjectInput = {
    where: InvoiceLineWhereUniqueInput
    update: XOR<InvoiceLineUpdateWithoutProjectInput, InvoiceLineUncheckedUpdateWithoutProjectInput>
    create: XOR<InvoiceLineCreateWithoutProjectInput, InvoiceLineUncheckedCreateWithoutProjectInput>
  }

  export type InvoiceLineUpdateWithWhereUniqueWithoutProjectInput = {
    where: InvoiceLineWhereUniqueInput
    data: XOR<InvoiceLineUpdateWithoutProjectInput, InvoiceLineUncheckedUpdateWithoutProjectInput>
  }

  export type InvoiceLineUpdateManyWithWhereWithoutProjectInput = {
    where: InvoiceLineScalarWhereInput
    data: XOR<InvoiceLineUpdateManyMutationInput, InvoiceLineUncheckedUpdateManyWithoutProjectInput>
  }

  export type InvoiceLineScalarWhereInput = {
    AND?: InvoiceLineScalarWhereInput | InvoiceLineScalarWhereInput[]
    OR?: InvoiceLineScalarWhereInput[]
    NOT?: InvoiceLineScalarWhereInput | InvoiceLineScalarWhereInput[]
    id?: StringFilter<"InvoiceLine"> | string
    projectId?: StringFilter<"InvoiceLine"> | string
    description?: StringFilter<"InvoiceLine"> | string
    quantity?: FloatFilter<"InvoiceLine"> | number
    unitPrice?: FloatFilter<"InvoiceLine"> | number
    totalPrice?: FloatFilter<"InvoiceLine"> | number
    createdAt?: DateTimeFilter<"InvoiceLine"> | Date | string
  }

  export type ProjectCreateWithoutStagesInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutProjectsInput
    client?: ClientCreateNestedOneWithoutProjectsInput
    costs?: MaterialCostCreateNestedManyWithoutProjectInput
    documents?: DocumentCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutStagesInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    clientId?: string | null
    costs?: MaterialCostUncheckedCreateNestedManyWithoutProjectInput
    documents?: DocumentUncheckedCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutStagesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutStagesInput, ProjectUncheckedCreateWithoutStagesInput>
  }

  export type ProjectUpsertWithoutStagesInput = {
    update: XOR<ProjectUpdateWithoutStagesInput, ProjectUncheckedUpdateWithoutStagesInput>
    create: XOR<ProjectCreateWithoutStagesInput, ProjectUncheckedCreateWithoutStagesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutStagesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutStagesInput, ProjectUncheckedUpdateWithoutStagesInput>
  }

  export type ProjectUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutProjectsNestedInput
    client?: ClientUpdateOneWithoutProjectsNestedInput
    costs?: MaterialCostUpdateManyWithoutProjectNestedInput
    documents?: DocumentUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    costs?: MaterialCostUncheckedUpdateManyWithoutProjectNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutCostsInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutProjectsInput
    client?: ClientCreateNestedOneWithoutProjectsInput
    stages?: ProjectStageCreateNestedManyWithoutProjectInput
    documents?: DocumentCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutCostsInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    clientId?: string | null
    stages?: ProjectStageUncheckedCreateNestedManyWithoutProjectInput
    documents?: DocumentUncheckedCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCostsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCostsInput, ProjectUncheckedCreateWithoutCostsInput>
  }

  export type SupplierInvoiceCreateWithoutMaterialCostsInput = {
    id?: string
    invoiceNumber: string
    supplier: string
    totalAmount: number
    taxAmount: number
    netAmount: number
    currency?: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    status?: string
    uploadedFileUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierInvoiceUncheckedCreateWithoutMaterialCostsInput = {
    id?: string
    invoiceNumber: string
    supplier: string
    totalAmount: number
    taxAmount: number
    netAmount: number
    currency?: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    status?: string
    uploadedFileUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierInvoiceCreateOrConnectWithoutMaterialCostsInput = {
    where: SupplierInvoiceWhereUniqueInput
    create: XOR<SupplierInvoiceCreateWithoutMaterialCostsInput, SupplierInvoiceUncheckedCreateWithoutMaterialCostsInput>
  }

  export type ProjectUpsertWithoutCostsInput = {
    update: XOR<ProjectUpdateWithoutCostsInput, ProjectUncheckedUpdateWithoutCostsInput>
    create: XOR<ProjectCreateWithoutCostsInput, ProjectUncheckedCreateWithoutCostsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutCostsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutCostsInput, ProjectUncheckedUpdateWithoutCostsInput>
  }

  export type ProjectUpdateWithoutCostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutProjectsNestedInput
    client?: ClientUpdateOneWithoutProjectsNestedInput
    stages?: ProjectStageUpdateManyWithoutProjectNestedInput
    documents?: DocumentUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    stages?: ProjectStageUncheckedUpdateManyWithoutProjectNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type SupplierInvoiceUpsertWithoutMaterialCostsInput = {
    update: XOR<SupplierInvoiceUpdateWithoutMaterialCostsInput, SupplierInvoiceUncheckedUpdateWithoutMaterialCostsInput>
    create: XOR<SupplierInvoiceCreateWithoutMaterialCostsInput, SupplierInvoiceUncheckedCreateWithoutMaterialCostsInput>
    where?: SupplierInvoiceWhereInput
  }

  export type SupplierInvoiceUpdateToOneWithWhereWithoutMaterialCostsInput = {
    where?: SupplierInvoiceWhereInput
    data: XOR<SupplierInvoiceUpdateWithoutMaterialCostsInput, SupplierInvoiceUncheckedUpdateWithoutMaterialCostsInput>
  }

  export type SupplierInvoiceUpdateWithoutMaterialCostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    supplier?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierInvoiceUncheckedUpdateWithoutMaterialCostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    supplier?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCostCreateWithoutInvoiceInput = {
    id?: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutCostsInput
  }

  export type MaterialCostUncheckedCreateWithoutInvoiceInput = {
    id?: string
    projectId: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialCostCreateOrConnectWithoutInvoiceInput = {
    where: MaterialCostWhereUniqueInput
    create: XOR<MaterialCostCreateWithoutInvoiceInput, MaterialCostUncheckedCreateWithoutInvoiceInput>
  }

  export type MaterialCostCreateManyInvoiceInputEnvelope = {
    data: MaterialCostCreateManyInvoiceInput | MaterialCostCreateManyInvoiceInput[]
  }

  export type MaterialCostUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: MaterialCostWhereUniqueInput
    update: XOR<MaterialCostUpdateWithoutInvoiceInput, MaterialCostUncheckedUpdateWithoutInvoiceInput>
    create: XOR<MaterialCostCreateWithoutInvoiceInput, MaterialCostUncheckedCreateWithoutInvoiceInput>
  }

  export type MaterialCostUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: MaterialCostWhereUniqueInput
    data: XOR<MaterialCostUpdateWithoutInvoiceInput, MaterialCostUncheckedUpdateWithoutInvoiceInput>
  }

  export type MaterialCostUpdateManyWithWhereWithoutInvoiceInput = {
    where: MaterialCostScalarWhereInput
    data: XOR<MaterialCostUpdateManyMutationInput, MaterialCostUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type ProjectCreateWithoutDocumentsInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutProjectsInput
    client?: ClientCreateNestedOneWithoutProjectsInput
    stages?: ProjectStageCreateNestedManyWithoutProjectInput
    costs?: MaterialCostCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutDocumentsInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    clientId?: string | null
    stages?: ProjectStageUncheckedCreateNestedManyWithoutProjectInput
    costs?: MaterialCostUncheckedCreateNestedManyWithoutProjectInput
    invoiceLines?: InvoiceLineUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutDocumentsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutDocumentsInput, ProjectUncheckedCreateWithoutDocumentsInput>
  }

  export type DocumentGenerationCreateWithoutDocumentInput = {
    id?: string
    documentType: string
    documentNumber: string
    templateData: string
    status?: string
    generatedBy?: string | null
    autoSend?: boolean
    recipientEmail?: string | null
    emailSent?: boolean
    emailSentAt?: Date | string | null
    fileUrl?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentGenerationUncheckedCreateWithoutDocumentInput = {
    id?: string
    documentType: string
    documentNumber: string
    templateData: string
    status?: string
    generatedBy?: string | null
    autoSend?: boolean
    recipientEmail?: string | null
    emailSent?: boolean
    emailSentAt?: Date | string | null
    fileUrl?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentGenerationCreateOrConnectWithoutDocumentInput = {
    where: DocumentGenerationWhereUniqueInput
    create: XOR<DocumentGenerationCreateWithoutDocumentInput, DocumentGenerationUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentGenerationCreateManyDocumentInputEnvelope = {
    data: DocumentGenerationCreateManyDocumentInput | DocumentGenerationCreateManyDocumentInput[]
  }

  export type ProjectUpsertWithoutDocumentsInput = {
    update: XOR<ProjectUpdateWithoutDocumentsInput, ProjectUncheckedUpdateWithoutDocumentsInput>
    create: XOR<ProjectCreateWithoutDocumentsInput, ProjectUncheckedCreateWithoutDocumentsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutDocumentsInput, ProjectUncheckedUpdateWithoutDocumentsInput>
  }

  export type ProjectUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutProjectsNestedInput
    client?: ClientUpdateOneWithoutProjectsNestedInput
    stages?: ProjectStageUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    stages?: ProjectStageUncheckedUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUncheckedUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type DocumentGenerationUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentGenerationWhereUniqueInput
    update: XOR<DocumentGenerationUpdateWithoutDocumentInput, DocumentGenerationUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentGenerationCreateWithoutDocumentInput, DocumentGenerationUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentGenerationUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentGenerationWhereUniqueInput
    data: XOR<DocumentGenerationUpdateWithoutDocumentInput, DocumentGenerationUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentGenerationUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentGenerationScalarWhereInput
    data: XOR<DocumentGenerationUpdateManyMutationInput, DocumentGenerationUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentGenerationScalarWhereInput = {
    AND?: DocumentGenerationScalarWhereInput | DocumentGenerationScalarWhereInput[]
    OR?: DocumentGenerationScalarWhereInput[]
    NOT?: DocumentGenerationScalarWhereInput | DocumentGenerationScalarWhereInput[]
    id?: StringFilter<"DocumentGeneration"> | string
    documentId?: StringFilter<"DocumentGeneration"> | string
    documentType?: StringFilter<"DocumentGeneration"> | string
    documentNumber?: StringFilter<"DocumentGeneration"> | string
    templateData?: StringFilter<"DocumentGeneration"> | string
    status?: StringFilter<"DocumentGeneration"> | string
    generatedBy?: StringNullableFilter<"DocumentGeneration"> | string | null
    autoSend?: BoolFilter<"DocumentGeneration"> | boolean
    recipientEmail?: StringNullableFilter<"DocumentGeneration"> | string | null
    emailSent?: BoolFilter<"DocumentGeneration"> | boolean
    emailSentAt?: DateTimeNullableFilter<"DocumentGeneration"> | Date | string | null
    fileUrl?: StringNullableFilter<"DocumentGeneration"> | string | null
    generatedAt?: DateTimeNullableFilter<"DocumentGeneration"> | Date | string | null
    createdAt?: DateTimeFilter<"DocumentGeneration"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentGeneration"> | Date | string
  }

  export type DocumentCreateWithoutGenerationsInput = {
    id?: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl?: string | null
    uploadedAt?: Date | string
    isPublic?: boolean
    project: ProjectCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutGenerationsInput = {
    id?: string
    projectId: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl?: string | null
    uploadedAt?: Date | string
    isPublic?: boolean
  }

  export type DocumentCreateOrConnectWithoutGenerationsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutGenerationsInput, DocumentUncheckedCreateWithoutGenerationsInput>
  }

  export type DocumentUpsertWithoutGenerationsInput = {
    update: XOR<DocumentUpdateWithoutGenerationsInput, DocumentUncheckedUpdateWithoutGenerationsInput>
    create: XOR<DocumentCreateWithoutGenerationsInput, DocumentUncheckedCreateWithoutGenerationsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutGenerationsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutGenerationsInput, DocumentUncheckedUpdateWithoutGenerationsInput>
  }

  export type DocumentUpdateWithoutGenerationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    project?: ProjectUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutGenerationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutCreatorInput
    requirements?: RequirementSubmissionCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatorInput
    requirements?: RequirementSubmissionUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutCreatorNestedInput
    requirements?: RequirementSubmissionUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutCreatorNestedInput
    requirements?: RequirementSubmissionUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutRequirementsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutCreatorInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRequirementsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutCreatorInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRequirementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRequirementsInput, UserUncheckedCreateWithoutRequirementsInput>
  }

  export type UserUpsertWithoutRequirementsInput = {
    update: XOR<UserUpdateWithoutRequirementsInput, UserUncheckedUpdateWithoutRequirementsInput>
    create: XOR<UserCreateWithoutRequirementsInput, UserUncheckedCreateWithoutRequirementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRequirementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRequirementsInput, UserUncheckedUpdateWithoutRequirementsInput>
  }

  export type UserUpdateWithoutRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutCreatorNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutCreatorNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ProjectCreateWithoutInvoiceLinesInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutProjectsInput
    client?: ClientCreateNestedOneWithoutProjectsInput
    stages?: ProjectStageCreateNestedManyWithoutProjectInput
    costs?: MaterialCostCreateNestedManyWithoutProjectInput
    documents?: DocumentCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutInvoiceLinesInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    clientId?: string | null
    stages?: ProjectStageUncheckedCreateNestedManyWithoutProjectInput
    costs?: MaterialCostUncheckedCreateNestedManyWithoutProjectInput
    documents?: DocumentUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutInvoiceLinesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutInvoiceLinesInput, ProjectUncheckedCreateWithoutInvoiceLinesInput>
  }

  export type ProjectUpsertWithoutInvoiceLinesInput = {
    update: XOR<ProjectUpdateWithoutInvoiceLinesInput, ProjectUncheckedUpdateWithoutInvoiceLinesInput>
    create: XOR<ProjectCreateWithoutInvoiceLinesInput, ProjectUncheckedCreateWithoutInvoiceLinesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutInvoiceLinesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutInvoiceLinesInput, ProjectUncheckedUpdateWithoutInvoiceLinesInput>
  }

  export type ProjectUpdateWithoutInvoiceLinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutProjectsNestedInput
    client?: ClientUpdateOneWithoutProjectsNestedInput
    stages?: ProjectStageUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUpdateManyWithoutProjectNestedInput
    documents?: DocumentUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutInvoiceLinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    stages?: ProjectStageUncheckedUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUncheckedUpdateManyWithoutProjectNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type MessageCreateManyUserInput = {
    id?: string
    content: string
    role: string
    createdAt?: Date | string
  }

  export type ProjectCreateManyCreatorInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId?: string | null
  }

  export type RequirementSubmissionCreateManyUserInput = {
    id?: string
    projectType: string
    urgency: string
    budget: string
    requirements: string
    createdAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type MessageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneWithoutProjectsNestedInput
    stages?: ProjectStageUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUpdateManyWithoutProjectNestedInput
    documents?: DocumentUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    stages?: ProjectStageUncheckedUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUncheckedUpdateManyWithoutProjectNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RequirementSubmissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectType?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    budget?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequirementSubmissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectType?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    budget?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequirementSubmissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectType?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    budget?: StringFieldUpdateOperationsInput | string
    requirements?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyClientInput = {
    id?: string
    projectRef: string
    name: string
    description?: string | null
    service: string
    status?: string
    priority?: string
    estimatedHours?: number | null
    actualHours?: number | null
    quoteAmount?: number | null
    location?: string | null
    startDate?: Date | string | null
    targetDate?: Date | string | null
    completedDate?: Date | string | null
    currentStage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
  }

  export type ProjectUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutProjectsNestedInput
    stages?: ProjectStageUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUpdateManyWithoutProjectNestedInput
    documents?: DocumentUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    stages?: ProjectStageUncheckedUpdateManyWithoutProjectNestedInput
    costs?: MaterialCostUncheckedUpdateManyWithoutProjectNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutProjectNestedInput
    invoiceLines?: InvoiceLineUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectRef?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    actualHours?: NullableIntFieldUpdateOperationsInput | number | null
    quoteAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    targetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectStageCreateManyProjectInput = {
    id?: string
    stageName: string
    status?: string
    order: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialCostCreateManyProjectInput = {
    id?: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentCreateManyProjectInput = {
    id?: string
    filename: string
    originalName: string
    fileType: string
    fileSize: number
    fileUrl?: string | null
    uploadedAt?: Date | string
    isPublic?: boolean
  }

  export type InvoiceLineCreateManyProjectInput = {
    id?: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type ProjectStageUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    stageName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStageUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    stageName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStageUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    stageName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCostUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: SupplierInvoiceUpdateOneWithoutMaterialCostsNestedInput
  }

  export type MaterialCostUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCostUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    generations?: DocumentGenerationUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    generations?: DocumentGenerationUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InvoiceLineUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceLineUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceLineUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCostCreateManyInvoiceInput = {
    id?: string
    projectId: string
    material: string
    quantity: number
    unitPrice: number
    totalCost: number
    supplier?: string | null
    category?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialCostUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutCostsNestedInput
  }

  export type MaterialCostUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCostUncheckedUpdateManyWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    material?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentGenerationCreateManyDocumentInput = {
    id?: string
    documentType: string
    documentNumber: string
    templateData: string
    status?: string
    generatedBy?: string | null
    autoSend?: boolean
    recipientEmail?: string | null
    emailSent?: boolean
    emailSentAt?: Date | string | null
    fileUrl?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentGenerationUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    templateData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    autoSend?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentGenerationUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    templateData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    autoSend?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentGenerationUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    templateData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    autoSend?: BoolFieldUpdateOperationsInput | boolean
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}