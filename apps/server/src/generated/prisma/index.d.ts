
/**
 * Client
**/

import * as runtime from './runtime/client.js';
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
 * Model UserSession
 * 
 */
export type UserSession = $Result.DefaultSelection<Prisma.$UserSessionPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model CampaignMember
 * 
 */
export type CampaignMember = $Result.DefaultSelection<Prisma.$CampaignMemberPayload>
/**
 * Model CampaignInvite
 * 
 */
export type CampaignInvite = $Result.DefaultSelection<Prisma.$CampaignInvitePayload>
/**
 * Model CampaignSession
 * 
 */
export type CampaignSession = $Result.DefaultSelection<Prisma.$CampaignSessionPayload>
/**
 * Model Map
 * 
 */
export type Map = $Result.DefaultSelection<Prisma.$MapPayload>
/**
 * Model MapToken
 * 
 */
export type MapToken = $Result.DefaultSelection<Prisma.$MapTokenPayload>
/**
 * Model Character
 * 
 */
export type Character = $Result.DefaultSelection<Prisma.$CharacterPayload>
/**
 * Model CharacterSheet
 * 
 */
export type CharacterSheet = $Result.DefaultSelection<Prisma.$CharacterSheetPayload>
/**
 * Model CharacterPermission
 * 
 */
export type CharacterPermission = $Result.DefaultSelection<Prisma.$CharacterPermissionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CampaignRole: {
  owner: 'owner',
  gm: 'gm',
  player: 'player',
  spectator: 'spectator'
};

export type CampaignRole = (typeof CampaignRole)[keyof typeof CampaignRole]


export const CampaignSessionStatus: {
  active: 'active',
  ended: 'ended'
};

export type CampaignSessionStatus = (typeof CampaignSessionStatus)[keyof typeof CampaignSessionStatus]


export const GridType: {
  square: 'square',
  hex: 'hex'
};

export type GridType = (typeof GridType)[keyof typeof GridType]


export const TokenVisibility: {
  public: 'public',
  gm_only: 'gm_only',
  owner_only: 'owner_only',
  custom: 'custom'
};

export type TokenVisibility = (typeof TokenVisibility)[keyof typeof TokenVisibility]


export const TokenDisposition: {
  friendly: 'friendly',
  neutral: 'neutral',
  hostile: 'hostile',
  hidden: 'hidden'
};

export type TokenDisposition = (typeof TokenDisposition)[keyof typeof TokenDisposition]


export const CharacterType: {
  pc: 'pc',
  npc: 'npc',
  monster: 'monster'
};

export type CharacterType = (typeof CharacterType)[keyof typeof CharacterType]


export const CharacterVisibility: {
  private: 'private',
  gm_only: 'gm_only',
  public: 'public'
};

export type CharacterVisibility = (typeof CharacterVisibility)[keyof typeof CharacterVisibility]

}

export type CampaignRole = $Enums.CampaignRole

export const CampaignRole: typeof $Enums.CampaignRole

export type CampaignSessionStatus = $Enums.CampaignSessionStatus

export const CampaignSessionStatus: typeof $Enums.CampaignSessionStatus

export type GridType = $Enums.GridType

export const GridType: typeof $Enums.GridType

export type TokenVisibility = $Enums.TokenVisibility

export const TokenVisibility: typeof $Enums.TokenVisibility

export type TokenDisposition = $Enums.TokenDisposition

export const TokenDisposition: typeof $Enums.TokenDisposition

export type CharacterType = $Enums.CharacterType

export const CharacterType: typeof $Enums.CharacterType

export type CharacterVisibility = $Enums.CharacterVisibility

export const CharacterVisibility: typeof $Enums.CharacterVisibility

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

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
   * `prisma.userSession`: Exposes CRUD operations for the **UserSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSessions
    * const userSessions = await prisma.userSession.findMany()
    * ```
    */
  get userSession(): Prisma.UserSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignMember`: Exposes CRUD operations for the **CampaignMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignMembers
    * const campaignMembers = await prisma.campaignMember.findMany()
    * ```
    */
  get campaignMember(): Prisma.CampaignMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignInvite`: Exposes CRUD operations for the **CampaignInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignInvites
    * const campaignInvites = await prisma.campaignInvite.findMany()
    * ```
    */
  get campaignInvite(): Prisma.CampaignInviteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignSession`: Exposes CRUD operations for the **CampaignSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignSessions
    * const campaignSessions = await prisma.campaignSession.findMany()
    * ```
    */
  get campaignSession(): Prisma.CampaignSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.map`: Exposes CRUD operations for the **Map** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Maps
    * const maps = await prisma.map.findMany()
    * ```
    */
  get map(): Prisma.MapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mapToken`: Exposes CRUD operations for the **MapToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MapTokens
    * const mapTokens = await prisma.mapToken.findMany()
    * ```
    */
  get mapToken(): Prisma.MapTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.character`: Exposes CRUD operations for the **Character** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Characters
    * const characters = await prisma.character.findMany()
    * ```
    */
  get character(): Prisma.CharacterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.characterSheet`: Exposes CRUD operations for the **CharacterSheet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CharacterSheets
    * const characterSheets = await prisma.characterSheet.findMany()
    * ```
    */
  get characterSheet(): Prisma.CharacterSheetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.characterPermission`: Exposes CRUD operations for the **CharacterPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CharacterPermissions
    * const characterPermissions = await prisma.characterPermission.findMany()
    * ```
    */
  get characterPermission(): Prisma.CharacterPermissionDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    UserSession: 'UserSession',
    Campaign: 'Campaign',
    CampaignMember: 'CampaignMember',
    CampaignInvite: 'CampaignInvite',
    CampaignSession: 'CampaignSession',
    Map: 'Map',
    MapToken: 'MapToken',
    Character: 'Character',
    CharacterSheet: 'CharacterSheet',
    CharacterPermission: 'CharacterPermission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userSession" | "campaign" | "campaignMember" | "campaignInvite" | "campaignSession" | "map" | "mapToken" | "character" | "characterSheet" | "characterPermission"
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
      UserSession: {
        payload: Prisma.$UserSessionPayload<ExtArgs>
        fields: Prisma.UserSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findFirst: {
            args: Prisma.UserSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findMany: {
            args: Prisma.UserSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          create: {
            args: Prisma.UserSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          createMany: {
            args: Prisma.UserSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          delete: {
            args: Prisma.UserSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          update: {
            args: Prisma.UserSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          deleteMany: {
            args: Prisma.UserSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          upsert: {
            args: Prisma.UserSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          aggregate: {
            args: Prisma.UserSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSession>
          }
          groupBy: {
            args: Prisma.UserSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UserSessionCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      CampaignMember: {
        payload: Prisma.$CampaignMemberPayload<ExtArgs>
        fields: Prisma.CampaignMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>
          }
          findFirst: {
            args: Prisma.CampaignMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>
          }
          findMany: {
            args: Prisma.CampaignMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>[]
          }
          create: {
            args: Prisma.CampaignMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>
          }
          createMany: {
            args: Prisma.CampaignMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>[]
          }
          delete: {
            args: Prisma.CampaignMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>
          }
          update: {
            args: Prisma.CampaignMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>
          }
          deleteMany: {
            args: Prisma.CampaignMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>[]
          }
          upsert: {
            args: Prisma.CampaignMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignMemberPayload>
          }
          aggregate: {
            args: Prisma.CampaignMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignMember>
          }
          groupBy: {
            args: Prisma.CampaignMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignMemberCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignMemberCountAggregateOutputType> | number
          }
        }
      }
      CampaignInvite: {
        payload: Prisma.$CampaignInvitePayload<ExtArgs>
        fields: Prisma.CampaignInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>
          }
          findFirst: {
            args: Prisma.CampaignInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>
          }
          findMany: {
            args: Prisma.CampaignInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>[]
          }
          create: {
            args: Prisma.CampaignInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>
          }
          createMany: {
            args: Prisma.CampaignInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>[]
          }
          delete: {
            args: Prisma.CampaignInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>
          }
          update: {
            args: Prisma.CampaignInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>
          }
          deleteMany: {
            args: Prisma.CampaignInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>[]
          }
          upsert: {
            args: Prisma.CampaignInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignInvitePayload>
          }
          aggregate: {
            args: Prisma.CampaignInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignInvite>
          }
          groupBy: {
            args: Prisma.CampaignInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignInviteCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignInviteCountAggregateOutputType> | number
          }
        }
      }
      CampaignSession: {
        payload: Prisma.$CampaignSessionPayload<ExtArgs>
        fields: Prisma.CampaignSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>
          }
          findFirst: {
            args: Prisma.CampaignSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>
          }
          findMany: {
            args: Prisma.CampaignSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>[]
          }
          create: {
            args: Prisma.CampaignSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>
          }
          createMany: {
            args: Prisma.CampaignSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>[]
          }
          delete: {
            args: Prisma.CampaignSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>
          }
          update: {
            args: Prisma.CampaignSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>
          }
          deleteMany: {
            args: Prisma.CampaignSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>[]
          }
          upsert: {
            args: Prisma.CampaignSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignSessionPayload>
          }
          aggregate: {
            args: Prisma.CampaignSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignSession>
          }
          groupBy: {
            args: Prisma.CampaignSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignSessionCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignSessionCountAggregateOutputType> | number
          }
        }
      }
      Map: {
        payload: Prisma.$MapPayload<ExtArgs>
        fields: Prisma.MapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          findFirst: {
            args: Prisma.MapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          findMany: {
            args: Prisma.MapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          create: {
            args: Prisma.MapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          createMany: {
            args: Prisma.MapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          delete: {
            args: Prisma.MapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          update: {
            args: Prisma.MapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          deleteMany: {
            args: Prisma.MapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          upsert: {
            args: Prisma.MapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          aggregate: {
            args: Prisma.MapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMap>
          }
          groupBy: {
            args: Prisma.MapGroupByArgs<ExtArgs>
            result: $Utils.Optional<MapGroupByOutputType>[]
          }
          count: {
            args: Prisma.MapCountArgs<ExtArgs>
            result: $Utils.Optional<MapCountAggregateOutputType> | number
          }
        }
      }
      MapToken: {
        payload: Prisma.$MapTokenPayload<ExtArgs>
        fields: Prisma.MapTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MapTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MapTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>
          }
          findFirst: {
            args: Prisma.MapTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MapTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>
          }
          findMany: {
            args: Prisma.MapTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>[]
          }
          create: {
            args: Prisma.MapTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>
          }
          createMany: {
            args: Prisma.MapTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MapTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>[]
          }
          delete: {
            args: Prisma.MapTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>
          }
          update: {
            args: Prisma.MapTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>
          }
          deleteMany: {
            args: Prisma.MapTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MapTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MapTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>[]
          }
          upsert: {
            args: Prisma.MapTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapTokenPayload>
          }
          aggregate: {
            args: Prisma.MapTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMapToken>
          }
          groupBy: {
            args: Prisma.MapTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<MapTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.MapTokenCountArgs<ExtArgs>
            result: $Utils.Optional<MapTokenCountAggregateOutputType> | number
          }
        }
      }
      Character: {
        payload: Prisma.$CharacterPayload<ExtArgs>
        fields: Prisma.CharacterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CharacterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CharacterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          findFirst: {
            args: Prisma.CharacterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CharacterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          findMany: {
            args: Prisma.CharacterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>[]
          }
          create: {
            args: Prisma.CharacterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          createMany: {
            args: Prisma.CharacterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CharacterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>[]
          }
          delete: {
            args: Prisma.CharacterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          update: {
            args: Prisma.CharacterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          deleteMany: {
            args: Prisma.CharacterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CharacterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CharacterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>[]
          }
          upsert: {
            args: Prisma.CharacterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          aggregate: {
            args: Prisma.CharacterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharacter>
          }
          groupBy: {
            args: Prisma.CharacterGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharacterGroupByOutputType>[]
          }
          count: {
            args: Prisma.CharacterCountArgs<ExtArgs>
            result: $Utils.Optional<CharacterCountAggregateOutputType> | number
          }
        }
      }
      CharacterSheet: {
        payload: Prisma.$CharacterSheetPayload<ExtArgs>
        fields: Prisma.CharacterSheetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CharacterSheetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CharacterSheetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>
          }
          findFirst: {
            args: Prisma.CharacterSheetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CharacterSheetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>
          }
          findMany: {
            args: Prisma.CharacterSheetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>[]
          }
          create: {
            args: Prisma.CharacterSheetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>
          }
          createMany: {
            args: Prisma.CharacterSheetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CharacterSheetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>[]
          }
          delete: {
            args: Prisma.CharacterSheetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>
          }
          update: {
            args: Prisma.CharacterSheetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>
          }
          deleteMany: {
            args: Prisma.CharacterSheetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CharacterSheetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CharacterSheetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>[]
          }
          upsert: {
            args: Prisma.CharacterSheetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterSheetPayload>
          }
          aggregate: {
            args: Prisma.CharacterSheetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharacterSheet>
          }
          groupBy: {
            args: Prisma.CharacterSheetGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharacterSheetGroupByOutputType>[]
          }
          count: {
            args: Prisma.CharacterSheetCountArgs<ExtArgs>
            result: $Utils.Optional<CharacterSheetCountAggregateOutputType> | number
          }
        }
      }
      CharacterPermission: {
        payload: Prisma.$CharacterPermissionPayload<ExtArgs>
        fields: Prisma.CharacterPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CharacterPermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CharacterPermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>
          }
          findFirst: {
            args: Prisma.CharacterPermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CharacterPermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>
          }
          findMany: {
            args: Prisma.CharacterPermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>[]
          }
          create: {
            args: Prisma.CharacterPermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>
          }
          createMany: {
            args: Prisma.CharacterPermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CharacterPermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>[]
          }
          delete: {
            args: Prisma.CharacterPermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>
          }
          update: {
            args: Prisma.CharacterPermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>
          }
          deleteMany: {
            args: Prisma.CharacterPermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CharacterPermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CharacterPermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>[]
          }
          upsert: {
            args: Prisma.CharacterPermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPermissionPayload>
          }
          aggregate: {
            args: Prisma.CharacterPermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharacterPermission>
          }
          groupBy: {
            args: Prisma.CharacterPermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharacterPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CharacterPermissionCountArgs<ExtArgs>
            result: $Utils.Optional<CharacterPermissionCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userSession?: UserSessionOmit
    campaign?: CampaignOmit
    campaignMember?: CampaignMemberOmit
    campaignInvite?: CampaignInviteOmit
    campaignSession?: CampaignSessionOmit
    map?: MapOmit
    mapToken?: MapTokenOmit
    character?: CharacterOmit
    characterSheet?: CharacterSheetOmit
    characterPermission?: CharacterPermissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    sessions: number
    ownedCampaigns: number
    campaignMembers: number
    createdCampaignInvites: number
    createdCampaignSessions: number
    characterPermissions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    ownedCampaigns?: boolean | UserCountOutputTypeCountOwnedCampaignsArgs
    campaignMembers?: boolean | UserCountOutputTypeCountCampaignMembersArgs
    createdCampaignInvites?: boolean | UserCountOutputTypeCountCreatedCampaignInvitesArgs
    createdCampaignSessions?: boolean | UserCountOutputTypeCountCreatedCampaignSessionsArgs
    characterPermissions?: boolean | UserCountOutputTypeCountCharacterPermissionsArgs
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
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCampaignMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedCampaignInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedCampaignSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCharacterPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharacterPermissionWhereInput
  }


  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    members: number
    invites: number
    sessions: number
    maps: number
    characters: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | CampaignCountOutputTypeCountMembersArgs
    invites?: boolean | CampaignCountOutputTypeCountInvitesArgs
    sessions?: boolean | CampaignCountOutputTypeCountSessionsArgs
    maps?: boolean | CampaignCountOutputTypeCountMapsArgs
    characters?: boolean | CampaignCountOutputTypeCountCharactersArgs
  }

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignMemberWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignInviteWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignSessionWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountMapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountCharactersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharacterWhereInput
  }


  /**
   * Count Type MapCountOutputType
   */

  export type MapCountOutputType = {
    tokens: number
  }

  export type MapCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokens?: boolean | MapCountOutputTypeCountTokensArgs
  }

  // Custom InputTypes
  /**
   * MapCountOutputType without action
   */
  export type MapCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapCountOutputType
     */
    select?: MapCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MapCountOutputType without action
   */
  export type MapCountOutputTypeCountTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapTokenWhereInput
  }


  /**
   * Count Type CharacterCountOutputType
   */

  export type CharacterCountOutputType = {
    permissions: number
    tokens: number
  }

  export type CharacterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | CharacterCountOutputTypeCountPermissionsArgs
    tokens?: boolean | CharacterCountOutputTypeCountTokensArgs
  }

  // Custom InputTypes
  /**
   * CharacterCountOutputType without action
   */
  export type CharacterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterCountOutputType
     */
    select?: CharacterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CharacterCountOutputType without action
   */
  export type CharacterCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharacterPermissionWhereInput
  }

  /**
   * CharacterCountOutputType without action
   */
  export type CharacterCountOutputTypeCountTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapTokenWhereInput
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
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
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
    name: string
    email: string
    passwordHash: string
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
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    ownedCampaigns?: boolean | User$ownedCampaignsArgs<ExtArgs>
    campaignMembers?: boolean | User$campaignMembersArgs<ExtArgs>
    createdCampaignInvites?: boolean | User$createdCampaignInvitesArgs<ExtArgs>
    createdCampaignSessions?: boolean | User$createdCampaignSessionsArgs<ExtArgs>
    characterPermissions?: boolean | User$characterPermissionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    ownedCampaigns?: boolean | User$ownedCampaignsArgs<ExtArgs>
    campaignMembers?: boolean | User$campaignMembersArgs<ExtArgs>
    createdCampaignInvites?: boolean | User$createdCampaignInvitesArgs<ExtArgs>
    createdCampaignSessions?: boolean | User$createdCampaignSessionsArgs<ExtArgs>
    characterPermissions?: boolean | User$characterPermissionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$UserSessionPayload<ExtArgs>[]
      ownedCampaigns: Prisma.$CampaignPayload<ExtArgs>[]
      campaignMembers: Prisma.$CampaignMemberPayload<ExtArgs>[]
      createdCampaignInvites: Prisma.$CampaignInvitePayload<ExtArgs>[]
      createdCampaignSessions: Prisma.$CampaignSessionPayload<ExtArgs>[]
      characterPermissions: Prisma.$CharacterPermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
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
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedCampaigns<T extends User$ownedCampaignsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedCampaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaignMembers<T extends User$campaignMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$campaignMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdCampaignInvites<T extends User$createdCampaignInvitesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdCampaignInvitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdCampaignSessions<T extends User$createdCampaignSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdCampaignSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    characterPermissions<T extends User$characterPermissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$characterPermissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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
    skipDuplicates?: boolean
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
    skipDuplicates?: boolean
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
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    cursor?: UserSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * User.ownedCampaigns
   */
  export type User$ownedCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * User.campaignMembers
   */
  export type User$campaignMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    where?: CampaignMemberWhereInput
    orderBy?: CampaignMemberOrderByWithRelationInput | CampaignMemberOrderByWithRelationInput[]
    cursor?: CampaignMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignMemberScalarFieldEnum | CampaignMemberScalarFieldEnum[]
  }

  /**
   * User.createdCampaignInvites
   */
  export type User$createdCampaignInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    where?: CampaignInviteWhereInput
    orderBy?: CampaignInviteOrderByWithRelationInput | CampaignInviteOrderByWithRelationInput[]
    cursor?: CampaignInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignInviteScalarFieldEnum | CampaignInviteScalarFieldEnum[]
  }

  /**
   * User.createdCampaignSessions
   */
  export type User$createdCampaignSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    where?: CampaignSessionWhereInput
    orderBy?: CampaignSessionOrderByWithRelationInput | CampaignSessionOrderByWithRelationInput[]
    cursor?: CampaignSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignSessionScalarFieldEnum | CampaignSessionScalarFieldEnum[]
  }

  /**
   * User.characterPermissions
   */
  export type User$characterPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    where?: CharacterPermissionWhereInput
    orderBy?: CharacterPermissionOrderByWithRelationInput | CharacterPermissionOrderByWithRelationInput[]
    cursor?: CharacterPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharacterPermissionScalarFieldEnum | CharacterPermissionScalarFieldEnum[]
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
   * Model UserSession
   */

  export type AggregateUserSession = {
    _count: UserSessionCountAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  export type UserSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshTokenHash: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type UserSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshTokenHash: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type UserSessionCountAggregateOutputType = {
    id: number
    userId: number
    refreshTokenHash: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type UserSessionMinAggregateInputType = {
    id?: true
    userId?: true
    refreshTokenHash?: true
    expiresAt?: true
    createdAt?: true
  }

  export type UserSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    refreshTokenHash?: true
    expiresAt?: true
    createdAt?: true
  }

  export type UserSessionCountAggregateInputType = {
    id?: true
    userId?: true
    refreshTokenHash?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type UserSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSession to aggregate.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSessions
    **/
    _count?: true | UserSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSessionMaxAggregateInputType
  }

  export type GetUserSessionAggregateType<T extends UserSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSession[P]>
      : GetScalarType<T[P], AggregateUserSession[P]>
  }




  export type UserSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithAggregationInput | UserSessionOrderByWithAggregationInput[]
    by: UserSessionScalarFieldEnum[] | UserSessionScalarFieldEnum
    having?: UserSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSessionCountAggregateInputType | true
    _min?: UserSessionMinAggregateInputType
    _max?: UserSessionMaxAggregateInputType
  }

  export type UserSessionGroupByOutputType = {
    id: string
    userId: string
    refreshTokenHash: string | null
    expiresAt: Date | null
    createdAt: Date
    _count: UserSessionCountAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  type GetUserSessionGroupByPayload<T extends UserSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
        }
      >
    >


  export type UserSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshTokenHash?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshTokenHash?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshTokenHash?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    refreshTokenHash?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type UserSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "refreshTokenHash" | "expiresAt" | "createdAt", ExtArgs["result"]["userSession"]>
  export type UserSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      refreshTokenHash: string | null
      expiresAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["userSession"]>
    composites: {}
  }

  type UserSessionGetPayload<S extends boolean | null | undefined | UserSessionDefaultArgs> = $Result.GetResult<Prisma.$UserSessionPayload, S>

  type UserSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSessionCountAggregateInputType | true
    }

  export interface UserSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSession'], meta: { name: 'UserSession' } }
    /**
     * Find zero or one UserSession that matches the filter.
     * @param {UserSessionFindUniqueArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSessionFindUniqueArgs>(args: SelectSubset<T, UserSessionFindUniqueArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSessionFindUniqueOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSessionFindFirstArgs>(args?: SelectSubset<T, UserSessionFindFirstArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSessions
     * const userSessions = await prisma.userSession.findMany()
     * 
     * // Get first 10 UserSessions
     * const userSessions = await prisma.userSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSessionWithIdOnly = await prisma.userSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSessionFindManyArgs>(args?: SelectSubset<T, UserSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSession.
     * @param {UserSessionCreateArgs} args - Arguments to create a UserSession.
     * @example
     * // Create one UserSession
     * const UserSession = await prisma.userSession.create({
     *   data: {
     *     // ... data to create a UserSession
     *   }
     * })
     * 
     */
    create<T extends UserSessionCreateArgs>(args: SelectSubset<T, UserSessionCreateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSessions.
     * @param {UserSessionCreateManyArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSessionCreateManyArgs>(args?: SelectSubset<T, UserSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSessions and returns the data saved in the database.
     * @param {UserSessionCreateManyAndReturnArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSession.
     * @param {UserSessionDeleteArgs} args - Arguments to delete one UserSession.
     * @example
     * // Delete one UserSession
     * const UserSession = await prisma.userSession.delete({
     *   where: {
     *     // ... filter to delete one UserSession
     *   }
     * })
     * 
     */
    delete<T extends UserSessionDeleteArgs>(args: SelectSubset<T, UserSessionDeleteArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSession.
     * @param {UserSessionUpdateArgs} args - Arguments to update one UserSession.
     * @example
     * // Update one UserSession
     * const userSession = await prisma.userSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSessionUpdateArgs>(args: SelectSubset<T, UserSessionUpdateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSessions.
     * @param {UserSessionDeleteManyArgs} args - Arguments to filter UserSessions to delete.
     * @example
     * // Delete a few UserSessions
     * const { count } = await prisma.userSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSessionDeleteManyArgs>(args?: SelectSubset<T, UserSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSessionUpdateManyArgs>(args: SelectSubset<T, UserSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions and returns the data updated in the database.
     * @param {UserSessionUpdateManyAndReturnArgs} args - Arguments to update many UserSessions.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSession.
     * @param {UserSessionUpsertArgs} args - Arguments to update or create a UserSession.
     * @example
     * // Update or create a UserSession
     * const userSession = await prisma.userSession.upsert({
     *   create: {
     *     // ... data to create a UserSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSession we want to update
     *   }
     * })
     */
    upsert<T extends UserSessionUpsertArgs>(args: SelectSubset<T, UserSessionUpsertArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionCountArgs} args - Arguments to filter UserSessions to count.
     * @example
     * // Count the number of UserSessions
     * const count = await prisma.userSession.count({
     *   where: {
     *     // ... the filter for the UserSessions we want to count
     *   }
     * })
    **/
    count<T extends UserSessionCountArgs>(
      args?: Subset<T, UserSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserSessionAggregateArgs>(args: Subset<T, UserSessionAggregateArgs>): Prisma.PrismaPromise<GetUserSessionAggregateType<T>>

    /**
     * Group by UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionGroupByArgs} args - Group by arguments.
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
      T extends UserSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSessionGroupByArgs['orderBy'] }
        : { orderBy?: UserSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSession model
   */
  readonly fields: UserSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the UserSession model
   */
  interface UserSessionFieldRefs {
    readonly id: FieldRef<"UserSession", 'String'>
    readonly userId: FieldRef<"UserSession", 'String'>
    readonly refreshTokenHash: FieldRef<"UserSession", 'String'>
    readonly expiresAt: FieldRef<"UserSession", 'DateTime'>
    readonly createdAt: FieldRef<"UserSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSession findUnique
   */
  export type UserSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findUniqueOrThrow
   */
  export type UserSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findFirst
   */
  export type UserSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findFirstOrThrow
   */
  export type UserSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findMany
   */
  export type UserSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSessions to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession create
   */
  export type UserSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSession.
     */
    data: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
  }

  /**
   * UserSession createMany
   */
  export type UserSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSession createManyAndReturn
   */
  export type UserSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession update
   */
  export type UserSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSession.
     */
    data: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
    /**
     * Choose, which UserSession to update.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession updateMany
   */
  export type UserSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
  }

  /**
   * UserSession updateManyAndReturn
   */
  export type UserSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession upsert
   */
  export type UserSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSession to update in case it exists.
     */
    where: UserSessionWhereUniqueInput
    /**
     * In case the UserSession found by the `where` argument doesn't exist, create a new UserSession with this data.
     */
    create: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
    /**
     * In case the UserSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
  }

  /**
   * UserSession delete
   */
  export type UserSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter which UserSession to delete.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession deleteMany
   */
  export type UserSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSessions to delete
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to delete.
     */
    limit?: number
  }

  /**
   * UserSession without action
   */
  export type UserSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    ownerUserId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archivedAt: Date | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    ownerUserId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archivedAt: Date | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    ownerUserId: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    archivedAt: number
    _all: number
  }


  export type CampaignMinAggregateInputType = {
    id?: true
    ownerUserId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    archivedAt?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    ownerUserId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    archivedAt?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    ownerUserId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    archivedAt?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    ownerUserId: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    archivedAt: Date | null
    _count: CampaignCountAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archivedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Campaign$membersArgs<ExtArgs>
    invites?: boolean | Campaign$invitesArgs<ExtArgs>
    sessions?: boolean | Campaign$sessionsArgs<ExtArgs>
    maps?: boolean | Campaign$mapsArgs<ExtArgs>
    characters?: boolean | Campaign$charactersArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archivedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archivedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    ownerUserId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archivedAt?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerUserId" | "name" | "description" | "createdAt" | "updatedAt" | "archivedAt", ExtArgs["result"]["campaign"]>
  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Campaign$membersArgs<ExtArgs>
    invites?: boolean | Campaign$invitesArgs<ExtArgs>
    sessions?: boolean | Campaign$sessionsArgs<ExtArgs>
    maps?: boolean | Campaign$mapsArgs<ExtArgs>
    characters?: boolean | Campaign$charactersArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$CampaignMemberPayload<ExtArgs>[]
      invites: Prisma.$CampaignInvitePayload<ExtArgs>[]
      sessions: Prisma.$CampaignSessionPayload<ExtArgs>[]
      maps: Prisma.$MapPayload<ExtArgs>[]
      characters: Prisma.$CharacterPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerUserId: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      archivedAt: Date | null
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
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
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
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
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Campaign$membersArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invites<T extends Campaign$invitesArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$invitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends Campaign$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    maps<T extends Campaign$mapsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$mapsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    characters<T extends Campaign$charactersArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$charactersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly ownerUserId: FieldRef<"Campaign", 'String'>
    readonly name: FieldRef<"Campaign", 'String'>
    readonly description: FieldRef<"Campaign", 'String'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
    readonly archivedAt: FieldRef<"Campaign", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign.members
   */
  export type Campaign$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    where?: CampaignMemberWhereInput
    orderBy?: CampaignMemberOrderByWithRelationInput | CampaignMemberOrderByWithRelationInput[]
    cursor?: CampaignMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignMemberScalarFieldEnum | CampaignMemberScalarFieldEnum[]
  }

  /**
   * Campaign.invites
   */
  export type Campaign$invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    where?: CampaignInviteWhereInput
    orderBy?: CampaignInviteOrderByWithRelationInput | CampaignInviteOrderByWithRelationInput[]
    cursor?: CampaignInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignInviteScalarFieldEnum | CampaignInviteScalarFieldEnum[]
  }

  /**
   * Campaign.sessions
   */
  export type Campaign$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    where?: CampaignSessionWhereInput
    orderBy?: CampaignSessionOrderByWithRelationInput | CampaignSessionOrderByWithRelationInput[]
    cursor?: CampaignSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignSessionScalarFieldEnum | CampaignSessionScalarFieldEnum[]
  }

  /**
   * Campaign.maps
   */
  export type Campaign$mapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    where?: MapWhereInput
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    cursor?: MapWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Campaign.characters
   */
  export type Campaign$charactersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    where?: CharacterWhereInput
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    cursor?: CharacterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
  }


  /**
   * Model CampaignMember
   */

  export type AggregateCampaignMember = {
    _count: CampaignMemberCountAggregateOutputType | null
    _min: CampaignMemberMinAggregateOutputType | null
    _max: CampaignMemberMaxAggregateOutputType | null
  }

  export type CampaignMemberMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    userId: string | null
    role: $Enums.CampaignRole | null
    displayName: string | null
    joinedAt: Date | null
    lastSeenAt: Date | null
  }

  export type CampaignMemberMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    userId: string | null
    role: $Enums.CampaignRole | null
    displayName: string | null
    joinedAt: Date | null
    lastSeenAt: Date | null
  }

  export type CampaignMemberCountAggregateOutputType = {
    id: number
    campaignId: number
    userId: number
    role: number
    displayName: number
    joinedAt: number
    lastSeenAt: number
    _all: number
  }


  export type CampaignMemberMinAggregateInputType = {
    id?: true
    campaignId?: true
    userId?: true
    role?: true
    displayName?: true
    joinedAt?: true
    lastSeenAt?: true
  }

  export type CampaignMemberMaxAggregateInputType = {
    id?: true
    campaignId?: true
    userId?: true
    role?: true
    displayName?: true
    joinedAt?: true
    lastSeenAt?: true
  }

  export type CampaignMemberCountAggregateInputType = {
    id?: true
    campaignId?: true
    userId?: true
    role?: true
    displayName?: true
    joinedAt?: true
    lastSeenAt?: true
    _all?: true
  }

  export type CampaignMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignMember to aggregate.
     */
    where?: CampaignMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignMembers to fetch.
     */
    orderBy?: CampaignMemberOrderByWithRelationInput | CampaignMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignMembers
    **/
    _count?: true | CampaignMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMemberMaxAggregateInputType
  }

  export type GetCampaignMemberAggregateType<T extends CampaignMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignMember[P]>
      : GetScalarType<T[P], AggregateCampaignMember[P]>
  }




  export type CampaignMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignMemberWhereInput
    orderBy?: CampaignMemberOrderByWithAggregationInput | CampaignMemberOrderByWithAggregationInput[]
    by: CampaignMemberScalarFieldEnum[] | CampaignMemberScalarFieldEnum
    having?: CampaignMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignMemberCountAggregateInputType | true
    _min?: CampaignMemberMinAggregateInputType
    _max?: CampaignMemberMaxAggregateInputType
  }

  export type CampaignMemberGroupByOutputType = {
    id: string
    campaignId: string
    userId: string
    role: $Enums.CampaignRole
    displayName: string | null
    joinedAt: Date
    lastSeenAt: Date | null
    _count: CampaignMemberCountAggregateOutputType | null
    _min: CampaignMemberMinAggregateOutputType | null
    _max: CampaignMemberMaxAggregateOutputType | null
  }

  type GetCampaignMemberGroupByPayload<T extends CampaignMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignMemberGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignMemberGroupByOutputType[P]>
        }
      >
    >


  export type CampaignMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    userId?: boolean
    role?: boolean
    displayName?: boolean
    joinedAt?: boolean
    lastSeenAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignMember"]>

  export type CampaignMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    userId?: boolean
    role?: boolean
    displayName?: boolean
    joinedAt?: boolean
    lastSeenAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignMember"]>

  export type CampaignMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    userId?: boolean
    role?: boolean
    displayName?: boolean
    joinedAt?: boolean
    lastSeenAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignMember"]>

  export type CampaignMemberSelectScalar = {
    id?: boolean
    campaignId?: boolean
    userId?: boolean
    role?: boolean
    displayName?: boolean
    joinedAt?: boolean
    lastSeenAt?: boolean
  }

  export type CampaignMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "userId" | "role" | "displayName" | "joinedAt" | "lastSeenAt", ExtArgs["result"]["campaignMember"]>
  export type CampaignMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CampaignMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignMember"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      userId: string
      role: $Enums.CampaignRole
      displayName: string | null
      joinedAt: Date
      lastSeenAt: Date | null
    }, ExtArgs["result"]["campaignMember"]>
    composites: {}
  }

  type CampaignMemberGetPayload<S extends boolean | null | undefined | CampaignMemberDefaultArgs> = $Result.GetResult<Prisma.$CampaignMemberPayload, S>

  type CampaignMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignMemberCountAggregateInputType | true
    }

  export interface CampaignMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignMember'], meta: { name: 'CampaignMember' } }
    /**
     * Find zero or one CampaignMember that matches the filter.
     * @param {CampaignMemberFindUniqueArgs} args - Arguments to find a CampaignMember
     * @example
     * // Get one CampaignMember
     * const campaignMember = await prisma.campaignMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignMemberFindUniqueArgs>(args: SelectSubset<T, CampaignMemberFindUniqueArgs<ExtArgs>>): Prisma__CampaignMemberClient<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignMemberFindUniqueOrThrowArgs} args - Arguments to find a CampaignMember
     * @example
     * // Get one CampaignMember
     * const campaignMember = await prisma.campaignMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignMemberClient<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignMemberFindFirstArgs} args - Arguments to find a CampaignMember
     * @example
     * // Get one CampaignMember
     * const campaignMember = await prisma.campaignMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignMemberFindFirstArgs>(args?: SelectSubset<T, CampaignMemberFindFirstArgs<ExtArgs>>): Prisma__CampaignMemberClient<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignMemberFindFirstOrThrowArgs} args - Arguments to find a CampaignMember
     * @example
     * // Get one CampaignMember
     * const campaignMember = await prisma.campaignMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignMemberClient<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignMembers
     * const campaignMembers = await prisma.campaignMember.findMany()
     * 
     * // Get first 10 CampaignMembers
     * const campaignMembers = await prisma.campaignMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignMemberWithIdOnly = await prisma.campaignMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignMemberFindManyArgs>(args?: SelectSubset<T, CampaignMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignMember.
     * @param {CampaignMemberCreateArgs} args - Arguments to create a CampaignMember.
     * @example
     * // Create one CampaignMember
     * const CampaignMember = await prisma.campaignMember.create({
     *   data: {
     *     // ... data to create a CampaignMember
     *   }
     * })
     * 
     */
    create<T extends CampaignMemberCreateArgs>(args: SelectSubset<T, CampaignMemberCreateArgs<ExtArgs>>): Prisma__CampaignMemberClient<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignMembers.
     * @param {CampaignMemberCreateManyArgs} args - Arguments to create many CampaignMembers.
     * @example
     * // Create many CampaignMembers
     * const campaignMember = await prisma.campaignMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignMemberCreateManyArgs>(args?: SelectSubset<T, CampaignMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampaignMembers and returns the data saved in the database.
     * @param {CampaignMemberCreateManyAndReturnArgs} args - Arguments to create many CampaignMembers.
     * @example
     * // Create many CampaignMembers
     * const campaignMember = await prisma.campaignMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampaignMembers and only return the `id`
     * const campaignMemberWithIdOnly = await prisma.campaignMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampaignMember.
     * @param {CampaignMemberDeleteArgs} args - Arguments to delete one CampaignMember.
     * @example
     * // Delete one CampaignMember
     * const CampaignMember = await prisma.campaignMember.delete({
     *   where: {
     *     // ... filter to delete one CampaignMember
     *   }
     * })
     * 
     */
    delete<T extends CampaignMemberDeleteArgs>(args: SelectSubset<T, CampaignMemberDeleteArgs<ExtArgs>>): Prisma__CampaignMemberClient<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignMember.
     * @param {CampaignMemberUpdateArgs} args - Arguments to update one CampaignMember.
     * @example
     * // Update one CampaignMember
     * const campaignMember = await prisma.campaignMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignMemberUpdateArgs>(args: SelectSubset<T, CampaignMemberUpdateArgs<ExtArgs>>): Prisma__CampaignMemberClient<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignMembers.
     * @param {CampaignMemberDeleteManyArgs} args - Arguments to filter CampaignMembers to delete.
     * @example
     * // Delete a few CampaignMembers
     * const { count } = await prisma.campaignMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignMemberDeleteManyArgs>(args?: SelectSubset<T, CampaignMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignMembers
     * const campaignMember = await prisma.campaignMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignMemberUpdateManyArgs>(args: SelectSubset<T, CampaignMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignMembers and returns the data updated in the database.
     * @param {CampaignMemberUpdateManyAndReturnArgs} args - Arguments to update many CampaignMembers.
     * @example
     * // Update many CampaignMembers
     * const campaignMember = await prisma.campaignMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampaignMembers and only return the `id`
     * const campaignMemberWithIdOnly = await prisma.campaignMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends CampaignMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampaignMember.
     * @param {CampaignMemberUpsertArgs} args - Arguments to update or create a CampaignMember.
     * @example
     * // Update or create a CampaignMember
     * const campaignMember = await prisma.campaignMember.upsert({
     *   create: {
     *     // ... data to create a CampaignMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignMember we want to update
     *   }
     * })
     */
    upsert<T extends CampaignMemberUpsertArgs>(args: SelectSubset<T, CampaignMemberUpsertArgs<ExtArgs>>): Prisma__CampaignMemberClient<$Result.GetResult<Prisma.$CampaignMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampaignMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignMemberCountArgs} args - Arguments to filter CampaignMembers to count.
     * @example
     * // Count the number of CampaignMembers
     * const count = await prisma.campaignMember.count({
     *   where: {
     *     // ... the filter for the CampaignMembers we want to count
     *   }
     * })
    **/
    count<T extends CampaignMemberCountArgs>(
      args?: Subset<T, CampaignMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignMemberAggregateArgs>(args: Subset<T, CampaignMemberAggregateArgs>): Prisma.PrismaPromise<GetCampaignMemberAggregateType<T>>

    /**
     * Group by CampaignMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignMemberGroupByArgs} args - Group by arguments.
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
      T extends CampaignMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignMemberGroupByArgs['orderBy'] }
        : { orderBy?: CampaignMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignMember model
   */
  readonly fields: CampaignMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CampaignMember model
   */
  interface CampaignMemberFieldRefs {
    readonly id: FieldRef<"CampaignMember", 'String'>
    readonly campaignId: FieldRef<"CampaignMember", 'String'>
    readonly userId: FieldRef<"CampaignMember", 'String'>
    readonly role: FieldRef<"CampaignMember", 'CampaignRole'>
    readonly displayName: FieldRef<"CampaignMember", 'String'>
    readonly joinedAt: FieldRef<"CampaignMember", 'DateTime'>
    readonly lastSeenAt: FieldRef<"CampaignMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampaignMember findUnique
   */
  export type CampaignMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * Filter, which CampaignMember to fetch.
     */
    where: CampaignMemberWhereUniqueInput
  }

  /**
   * CampaignMember findUniqueOrThrow
   */
  export type CampaignMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * Filter, which CampaignMember to fetch.
     */
    where: CampaignMemberWhereUniqueInput
  }

  /**
   * CampaignMember findFirst
   */
  export type CampaignMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * Filter, which CampaignMember to fetch.
     */
    where?: CampaignMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignMembers to fetch.
     */
    orderBy?: CampaignMemberOrderByWithRelationInput | CampaignMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignMembers.
     */
    cursor?: CampaignMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignMembers.
     */
    distinct?: CampaignMemberScalarFieldEnum | CampaignMemberScalarFieldEnum[]
  }

  /**
   * CampaignMember findFirstOrThrow
   */
  export type CampaignMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * Filter, which CampaignMember to fetch.
     */
    where?: CampaignMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignMembers to fetch.
     */
    orderBy?: CampaignMemberOrderByWithRelationInput | CampaignMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignMembers.
     */
    cursor?: CampaignMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignMembers.
     */
    distinct?: CampaignMemberScalarFieldEnum | CampaignMemberScalarFieldEnum[]
  }

  /**
   * CampaignMember findMany
   */
  export type CampaignMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * Filter, which CampaignMembers to fetch.
     */
    where?: CampaignMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignMembers to fetch.
     */
    orderBy?: CampaignMemberOrderByWithRelationInput | CampaignMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignMembers.
     */
    cursor?: CampaignMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignMembers.
     */
    distinct?: CampaignMemberScalarFieldEnum | CampaignMemberScalarFieldEnum[]
  }

  /**
   * CampaignMember create
   */
  export type CampaignMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignMember.
     */
    data: XOR<CampaignMemberCreateInput, CampaignMemberUncheckedCreateInput>
  }

  /**
   * CampaignMember createMany
   */
  export type CampaignMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignMembers.
     */
    data: CampaignMemberCreateManyInput | CampaignMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampaignMember createManyAndReturn
   */
  export type CampaignMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * The data used to create many CampaignMembers.
     */
    data: CampaignMemberCreateManyInput | CampaignMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignMember update
   */
  export type CampaignMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignMember.
     */
    data: XOR<CampaignMemberUpdateInput, CampaignMemberUncheckedUpdateInput>
    /**
     * Choose, which CampaignMember to update.
     */
    where: CampaignMemberWhereUniqueInput
  }

  /**
   * CampaignMember updateMany
   */
  export type CampaignMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignMembers.
     */
    data: XOR<CampaignMemberUpdateManyMutationInput, CampaignMemberUncheckedUpdateManyInput>
    /**
     * Filter which CampaignMembers to update
     */
    where?: CampaignMemberWhereInput
    /**
     * Limit how many CampaignMembers to update.
     */
    limit?: number
  }

  /**
   * CampaignMember updateManyAndReturn
   */
  export type CampaignMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * The data used to update CampaignMembers.
     */
    data: XOR<CampaignMemberUpdateManyMutationInput, CampaignMemberUncheckedUpdateManyInput>
    /**
     * Filter which CampaignMembers to update
     */
    where?: CampaignMemberWhereInput
    /**
     * Limit how many CampaignMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignMember upsert
   */
  export type CampaignMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignMember to update in case it exists.
     */
    where: CampaignMemberWhereUniqueInput
    /**
     * In case the CampaignMember found by the `where` argument doesn't exist, create a new CampaignMember with this data.
     */
    create: XOR<CampaignMemberCreateInput, CampaignMemberUncheckedCreateInput>
    /**
     * In case the CampaignMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignMemberUpdateInput, CampaignMemberUncheckedUpdateInput>
  }

  /**
   * CampaignMember delete
   */
  export type CampaignMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
    /**
     * Filter which CampaignMember to delete.
     */
    where: CampaignMemberWhereUniqueInput
  }

  /**
   * CampaignMember deleteMany
   */
  export type CampaignMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignMembers to delete
     */
    where?: CampaignMemberWhereInput
    /**
     * Limit how many CampaignMembers to delete.
     */
    limit?: number
  }

  /**
   * CampaignMember without action
   */
  export type CampaignMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignMember
     */
    select?: CampaignMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignMember
     */
    omit?: CampaignMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignMemberInclude<ExtArgs> | null
  }


  /**
   * Model CampaignInvite
   */

  export type AggregateCampaignInvite = {
    _count: CampaignInviteCountAggregateOutputType | null
    _avg: CampaignInviteAvgAggregateOutputType | null
    _sum: CampaignInviteSumAggregateOutputType | null
    _min: CampaignInviteMinAggregateOutputType | null
    _max: CampaignInviteMaxAggregateOutputType | null
  }

  export type CampaignInviteAvgAggregateOutputType = {
    maxUses: number | null
    usesCount: number | null
  }

  export type CampaignInviteSumAggregateOutputType = {
    maxUses: number | null
    usesCount: number | null
  }

  export type CampaignInviteMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    code: string | null
    roleOnJoin: $Enums.CampaignRole | null
    createdByUserId: string | null
    maxUses: number | null
    usesCount: number | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type CampaignInviteMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    code: string | null
    roleOnJoin: $Enums.CampaignRole | null
    createdByUserId: string | null
    maxUses: number | null
    usesCount: number | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type CampaignInviteCountAggregateOutputType = {
    id: number
    campaignId: number
    code: number
    roleOnJoin: number
    createdByUserId: number
    maxUses: number
    usesCount: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type CampaignInviteAvgAggregateInputType = {
    maxUses?: true
    usesCount?: true
  }

  export type CampaignInviteSumAggregateInputType = {
    maxUses?: true
    usesCount?: true
  }

  export type CampaignInviteMinAggregateInputType = {
    id?: true
    campaignId?: true
    code?: true
    roleOnJoin?: true
    createdByUserId?: true
    maxUses?: true
    usesCount?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type CampaignInviteMaxAggregateInputType = {
    id?: true
    campaignId?: true
    code?: true
    roleOnJoin?: true
    createdByUserId?: true
    maxUses?: true
    usesCount?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type CampaignInviteCountAggregateInputType = {
    id?: true
    campaignId?: true
    code?: true
    roleOnJoin?: true
    createdByUserId?: true
    maxUses?: true
    usesCount?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type CampaignInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignInvite to aggregate.
     */
    where?: CampaignInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignInvites to fetch.
     */
    orderBy?: CampaignInviteOrderByWithRelationInput | CampaignInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignInvites
    **/
    _count?: true | CampaignInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignInviteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignInviteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignInviteMaxAggregateInputType
  }

  export type GetCampaignInviteAggregateType<T extends CampaignInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignInvite[P]>
      : GetScalarType<T[P], AggregateCampaignInvite[P]>
  }




  export type CampaignInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignInviteWhereInput
    orderBy?: CampaignInviteOrderByWithAggregationInput | CampaignInviteOrderByWithAggregationInput[]
    by: CampaignInviteScalarFieldEnum[] | CampaignInviteScalarFieldEnum
    having?: CampaignInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignInviteCountAggregateInputType | true
    _avg?: CampaignInviteAvgAggregateInputType
    _sum?: CampaignInviteSumAggregateInputType
    _min?: CampaignInviteMinAggregateInputType
    _max?: CampaignInviteMaxAggregateInputType
  }

  export type CampaignInviteGroupByOutputType = {
    id: string
    campaignId: string
    code: string
    roleOnJoin: $Enums.CampaignRole
    createdByUserId: string
    maxUses: number | null
    usesCount: number
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date
    _count: CampaignInviteCountAggregateOutputType | null
    _avg: CampaignInviteAvgAggregateOutputType | null
    _sum: CampaignInviteSumAggregateOutputType | null
    _min: CampaignInviteMinAggregateOutputType | null
    _max: CampaignInviteMaxAggregateOutputType | null
  }

  type GetCampaignInviteGroupByPayload<T extends CampaignInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignInviteGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignInviteGroupByOutputType[P]>
        }
      >
    >


  export type CampaignInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    code?: boolean
    roleOnJoin?: boolean
    createdByUserId?: boolean
    maxUses?: boolean
    usesCount?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignInvite"]>

  export type CampaignInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    code?: boolean
    roleOnJoin?: boolean
    createdByUserId?: boolean
    maxUses?: boolean
    usesCount?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignInvite"]>

  export type CampaignInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    code?: boolean
    roleOnJoin?: boolean
    createdByUserId?: boolean
    maxUses?: boolean
    usesCount?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignInvite"]>

  export type CampaignInviteSelectScalar = {
    id?: boolean
    campaignId?: boolean
    code?: boolean
    roleOnJoin?: boolean
    createdByUserId?: boolean
    maxUses?: boolean
    usesCount?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type CampaignInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "code" | "roleOnJoin" | "createdByUserId" | "maxUses" | "usesCount" | "expiresAt" | "revokedAt" | "createdAt", ExtArgs["result"]["campaignInvite"]>
  export type CampaignInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CampaignInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignInvite"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      code: string
      roleOnJoin: $Enums.CampaignRole
      createdByUserId: string
      maxUses: number | null
      usesCount: number
      expiresAt: Date | null
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["campaignInvite"]>
    composites: {}
  }

  type CampaignInviteGetPayload<S extends boolean | null | undefined | CampaignInviteDefaultArgs> = $Result.GetResult<Prisma.$CampaignInvitePayload, S>

  type CampaignInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignInviteCountAggregateInputType | true
    }

  export interface CampaignInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignInvite'], meta: { name: 'CampaignInvite' } }
    /**
     * Find zero or one CampaignInvite that matches the filter.
     * @param {CampaignInviteFindUniqueArgs} args - Arguments to find a CampaignInvite
     * @example
     * // Get one CampaignInvite
     * const campaignInvite = await prisma.campaignInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignInviteFindUniqueArgs>(args: SelectSubset<T, CampaignInviteFindUniqueArgs<ExtArgs>>): Prisma__CampaignInviteClient<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignInviteFindUniqueOrThrowArgs} args - Arguments to find a CampaignInvite
     * @example
     * // Get one CampaignInvite
     * const campaignInvite = await prisma.campaignInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignInviteClient<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignInviteFindFirstArgs} args - Arguments to find a CampaignInvite
     * @example
     * // Get one CampaignInvite
     * const campaignInvite = await prisma.campaignInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignInviteFindFirstArgs>(args?: SelectSubset<T, CampaignInviteFindFirstArgs<ExtArgs>>): Prisma__CampaignInviteClient<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignInviteFindFirstOrThrowArgs} args - Arguments to find a CampaignInvite
     * @example
     * // Get one CampaignInvite
     * const campaignInvite = await prisma.campaignInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignInviteClient<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignInvites
     * const campaignInvites = await prisma.campaignInvite.findMany()
     * 
     * // Get first 10 CampaignInvites
     * const campaignInvites = await prisma.campaignInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignInviteWithIdOnly = await prisma.campaignInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignInviteFindManyArgs>(args?: SelectSubset<T, CampaignInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignInvite.
     * @param {CampaignInviteCreateArgs} args - Arguments to create a CampaignInvite.
     * @example
     * // Create one CampaignInvite
     * const CampaignInvite = await prisma.campaignInvite.create({
     *   data: {
     *     // ... data to create a CampaignInvite
     *   }
     * })
     * 
     */
    create<T extends CampaignInviteCreateArgs>(args: SelectSubset<T, CampaignInviteCreateArgs<ExtArgs>>): Prisma__CampaignInviteClient<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignInvites.
     * @param {CampaignInviteCreateManyArgs} args - Arguments to create many CampaignInvites.
     * @example
     * // Create many CampaignInvites
     * const campaignInvite = await prisma.campaignInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignInviteCreateManyArgs>(args?: SelectSubset<T, CampaignInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampaignInvites and returns the data saved in the database.
     * @param {CampaignInviteCreateManyAndReturnArgs} args - Arguments to create many CampaignInvites.
     * @example
     * // Create many CampaignInvites
     * const campaignInvite = await prisma.campaignInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampaignInvites and only return the `id`
     * const campaignInviteWithIdOnly = await prisma.campaignInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampaignInvite.
     * @param {CampaignInviteDeleteArgs} args - Arguments to delete one CampaignInvite.
     * @example
     * // Delete one CampaignInvite
     * const CampaignInvite = await prisma.campaignInvite.delete({
     *   where: {
     *     // ... filter to delete one CampaignInvite
     *   }
     * })
     * 
     */
    delete<T extends CampaignInviteDeleteArgs>(args: SelectSubset<T, CampaignInviteDeleteArgs<ExtArgs>>): Prisma__CampaignInviteClient<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignInvite.
     * @param {CampaignInviteUpdateArgs} args - Arguments to update one CampaignInvite.
     * @example
     * // Update one CampaignInvite
     * const campaignInvite = await prisma.campaignInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignInviteUpdateArgs>(args: SelectSubset<T, CampaignInviteUpdateArgs<ExtArgs>>): Prisma__CampaignInviteClient<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignInvites.
     * @param {CampaignInviteDeleteManyArgs} args - Arguments to filter CampaignInvites to delete.
     * @example
     * // Delete a few CampaignInvites
     * const { count } = await prisma.campaignInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignInviteDeleteManyArgs>(args?: SelectSubset<T, CampaignInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignInvites
     * const campaignInvite = await prisma.campaignInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignInviteUpdateManyArgs>(args: SelectSubset<T, CampaignInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignInvites and returns the data updated in the database.
     * @param {CampaignInviteUpdateManyAndReturnArgs} args - Arguments to update many CampaignInvites.
     * @example
     * // Update many CampaignInvites
     * const campaignInvite = await prisma.campaignInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampaignInvites and only return the `id`
     * const campaignInviteWithIdOnly = await prisma.campaignInvite.updateManyAndReturn({
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
    updateManyAndReturn<T extends CampaignInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampaignInvite.
     * @param {CampaignInviteUpsertArgs} args - Arguments to update or create a CampaignInvite.
     * @example
     * // Update or create a CampaignInvite
     * const campaignInvite = await prisma.campaignInvite.upsert({
     *   create: {
     *     // ... data to create a CampaignInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignInvite we want to update
     *   }
     * })
     */
    upsert<T extends CampaignInviteUpsertArgs>(args: SelectSubset<T, CampaignInviteUpsertArgs<ExtArgs>>): Prisma__CampaignInviteClient<$Result.GetResult<Prisma.$CampaignInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampaignInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignInviteCountArgs} args - Arguments to filter CampaignInvites to count.
     * @example
     * // Count the number of CampaignInvites
     * const count = await prisma.campaignInvite.count({
     *   where: {
     *     // ... the filter for the CampaignInvites we want to count
     *   }
     * })
    **/
    count<T extends CampaignInviteCountArgs>(
      args?: Subset<T, CampaignInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignInviteAggregateArgs>(args: Subset<T, CampaignInviteAggregateArgs>): Prisma.PrismaPromise<GetCampaignInviteAggregateType<T>>

    /**
     * Group by CampaignInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignInviteGroupByArgs} args - Group by arguments.
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
      T extends CampaignInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignInviteGroupByArgs['orderBy'] }
        : { orderBy?: CampaignInviteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignInvite model
   */
  readonly fields: CampaignInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CampaignInvite model
   */
  interface CampaignInviteFieldRefs {
    readonly id: FieldRef<"CampaignInvite", 'String'>
    readonly campaignId: FieldRef<"CampaignInvite", 'String'>
    readonly code: FieldRef<"CampaignInvite", 'String'>
    readonly roleOnJoin: FieldRef<"CampaignInvite", 'CampaignRole'>
    readonly createdByUserId: FieldRef<"CampaignInvite", 'String'>
    readonly maxUses: FieldRef<"CampaignInvite", 'Int'>
    readonly usesCount: FieldRef<"CampaignInvite", 'Int'>
    readonly expiresAt: FieldRef<"CampaignInvite", 'DateTime'>
    readonly revokedAt: FieldRef<"CampaignInvite", 'DateTime'>
    readonly createdAt: FieldRef<"CampaignInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampaignInvite findUnique
   */
  export type CampaignInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * Filter, which CampaignInvite to fetch.
     */
    where: CampaignInviteWhereUniqueInput
  }

  /**
   * CampaignInvite findUniqueOrThrow
   */
  export type CampaignInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * Filter, which CampaignInvite to fetch.
     */
    where: CampaignInviteWhereUniqueInput
  }

  /**
   * CampaignInvite findFirst
   */
  export type CampaignInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * Filter, which CampaignInvite to fetch.
     */
    where?: CampaignInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignInvites to fetch.
     */
    orderBy?: CampaignInviteOrderByWithRelationInput | CampaignInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignInvites.
     */
    cursor?: CampaignInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignInvites.
     */
    distinct?: CampaignInviteScalarFieldEnum | CampaignInviteScalarFieldEnum[]
  }

  /**
   * CampaignInvite findFirstOrThrow
   */
  export type CampaignInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * Filter, which CampaignInvite to fetch.
     */
    where?: CampaignInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignInvites to fetch.
     */
    orderBy?: CampaignInviteOrderByWithRelationInput | CampaignInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignInvites.
     */
    cursor?: CampaignInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignInvites.
     */
    distinct?: CampaignInviteScalarFieldEnum | CampaignInviteScalarFieldEnum[]
  }

  /**
   * CampaignInvite findMany
   */
  export type CampaignInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * Filter, which CampaignInvites to fetch.
     */
    where?: CampaignInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignInvites to fetch.
     */
    orderBy?: CampaignInviteOrderByWithRelationInput | CampaignInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignInvites.
     */
    cursor?: CampaignInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignInvites.
     */
    distinct?: CampaignInviteScalarFieldEnum | CampaignInviteScalarFieldEnum[]
  }

  /**
   * CampaignInvite create
   */
  export type CampaignInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignInvite.
     */
    data: XOR<CampaignInviteCreateInput, CampaignInviteUncheckedCreateInput>
  }

  /**
   * CampaignInvite createMany
   */
  export type CampaignInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignInvites.
     */
    data: CampaignInviteCreateManyInput | CampaignInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampaignInvite createManyAndReturn
   */
  export type CampaignInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * The data used to create many CampaignInvites.
     */
    data: CampaignInviteCreateManyInput | CampaignInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignInvite update
   */
  export type CampaignInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignInvite.
     */
    data: XOR<CampaignInviteUpdateInput, CampaignInviteUncheckedUpdateInput>
    /**
     * Choose, which CampaignInvite to update.
     */
    where: CampaignInviteWhereUniqueInput
  }

  /**
   * CampaignInvite updateMany
   */
  export type CampaignInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignInvites.
     */
    data: XOR<CampaignInviteUpdateManyMutationInput, CampaignInviteUncheckedUpdateManyInput>
    /**
     * Filter which CampaignInvites to update
     */
    where?: CampaignInviteWhereInput
    /**
     * Limit how many CampaignInvites to update.
     */
    limit?: number
  }

  /**
   * CampaignInvite updateManyAndReturn
   */
  export type CampaignInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * The data used to update CampaignInvites.
     */
    data: XOR<CampaignInviteUpdateManyMutationInput, CampaignInviteUncheckedUpdateManyInput>
    /**
     * Filter which CampaignInvites to update
     */
    where?: CampaignInviteWhereInput
    /**
     * Limit how many CampaignInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignInvite upsert
   */
  export type CampaignInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignInvite to update in case it exists.
     */
    where: CampaignInviteWhereUniqueInput
    /**
     * In case the CampaignInvite found by the `where` argument doesn't exist, create a new CampaignInvite with this data.
     */
    create: XOR<CampaignInviteCreateInput, CampaignInviteUncheckedCreateInput>
    /**
     * In case the CampaignInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignInviteUpdateInput, CampaignInviteUncheckedUpdateInput>
  }

  /**
   * CampaignInvite delete
   */
  export type CampaignInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
    /**
     * Filter which CampaignInvite to delete.
     */
    where: CampaignInviteWhereUniqueInput
  }

  /**
   * CampaignInvite deleteMany
   */
  export type CampaignInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignInvites to delete
     */
    where?: CampaignInviteWhereInput
    /**
     * Limit how many CampaignInvites to delete.
     */
    limit?: number
  }

  /**
   * CampaignInvite without action
   */
  export type CampaignInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignInvite
     */
    select?: CampaignInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignInvite
     */
    omit?: CampaignInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInviteInclude<ExtArgs> | null
  }


  /**
   * Model CampaignSession
   */

  export type AggregateCampaignSession = {
    _count: CampaignSessionCountAggregateOutputType | null
    _min: CampaignSessionMinAggregateOutputType | null
    _max: CampaignSessionMaxAggregateOutputType | null
  }

  export type CampaignSessionMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    activeMapId: string | null
    status: $Enums.CampaignSessionStatus | null
    startedAt: Date | null
    endedAt: Date | null
    createdByUserId: string | null
  }

  export type CampaignSessionMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    activeMapId: string | null
    status: $Enums.CampaignSessionStatus | null
    startedAt: Date | null
    endedAt: Date | null
    createdByUserId: string | null
  }

  export type CampaignSessionCountAggregateOutputType = {
    id: number
    campaignId: number
    activeMapId: number
    status: number
    startedAt: number
    endedAt: number
    createdByUserId: number
    _all: number
  }


  export type CampaignSessionMinAggregateInputType = {
    id?: true
    campaignId?: true
    activeMapId?: true
    status?: true
    startedAt?: true
    endedAt?: true
    createdByUserId?: true
  }

  export type CampaignSessionMaxAggregateInputType = {
    id?: true
    campaignId?: true
    activeMapId?: true
    status?: true
    startedAt?: true
    endedAt?: true
    createdByUserId?: true
  }

  export type CampaignSessionCountAggregateInputType = {
    id?: true
    campaignId?: true
    activeMapId?: true
    status?: true
    startedAt?: true
    endedAt?: true
    createdByUserId?: true
    _all?: true
  }

  export type CampaignSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignSession to aggregate.
     */
    where?: CampaignSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignSessions to fetch.
     */
    orderBy?: CampaignSessionOrderByWithRelationInput | CampaignSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignSessions
    **/
    _count?: true | CampaignSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignSessionMaxAggregateInputType
  }

  export type GetCampaignSessionAggregateType<T extends CampaignSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignSession[P]>
      : GetScalarType<T[P], AggregateCampaignSession[P]>
  }




  export type CampaignSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignSessionWhereInput
    orderBy?: CampaignSessionOrderByWithAggregationInput | CampaignSessionOrderByWithAggregationInput[]
    by: CampaignSessionScalarFieldEnum[] | CampaignSessionScalarFieldEnum
    having?: CampaignSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignSessionCountAggregateInputType | true
    _min?: CampaignSessionMinAggregateInputType
    _max?: CampaignSessionMaxAggregateInputType
  }

  export type CampaignSessionGroupByOutputType = {
    id: string
    campaignId: string
    activeMapId: string | null
    status: $Enums.CampaignSessionStatus
    startedAt: Date
    endedAt: Date | null
    createdByUserId: string
    _count: CampaignSessionCountAggregateOutputType | null
    _min: CampaignSessionMinAggregateOutputType | null
    _max: CampaignSessionMaxAggregateOutputType | null
  }

  type GetCampaignSessionGroupByPayload<T extends CampaignSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignSessionGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignSessionGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    activeMapId?: boolean
    status?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdByUserId?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignSession"]>

  export type CampaignSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    activeMapId?: boolean
    status?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdByUserId?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignSession"]>

  export type CampaignSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    activeMapId?: boolean
    status?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdByUserId?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignSession"]>

  export type CampaignSessionSelectScalar = {
    id?: boolean
    campaignId?: boolean
    activeMapId?: boolean
    status?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdByUserId?: boolean
  }

  export type CampaignSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "activeMapId" | "status" | "startedAt" | "endedAt" | "createdByUserId", ExtArgs["result"]["campaignSession"]>
  export type CampaignSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CampaignSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CampaignSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignSession"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      activeMapId: string | null
      status: $Enums.CampaignSessionStatus
      startedAt: Date
      endedAt: Date | null
      createdByUserId: string
    }, ExtArgs["result"]["campaignSession"]>
    composites: {}
  }

  type CampaignSessionGetPayload<S extends boolean | null | undefined | CampaignSessionDefaultArgs> = $Result.GetResult<Prisma.$CampaignSessionPayload, S>

  type CampaignSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignSessionCountAggregateInputType | true
    }

  export interface CampaignSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignSession'], meta: { name: 'CampaignSession' } }
    /**
     * Find zero or one CampaignSession that matches the filter.
     * @param {CampaignSessionFindUniqueArgs} args - Arguments to find a CampaignSession
     * @example
     * // Get one CampaignSession
     * const campaignSession = await prisma.campaignSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignSessionFindUniqueArgs>(args: SelectSubset<T, CampaignSessionFindUniqueArgs<ExtArgs>>): Prisma__CampaignSessionClient<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignSessionFindUniqueOrThrowArgs} args - Arguments to find a CampaignSession
     * @example
     * // Get one CampaignSession
     * const campaignSession = await prisma.campaignSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignSessionClient<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignSessionFindFirstArgs} args - Arguments to find a CampaignSession
     * @example
     * // Get one CampaignSession
     * const campaignSession = await prisma.campaignSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignSessionFindFirstArgs>(args?: SelectSubset<T, CampaignSessionFindFirstArgs<ExtArgs>>): Prisma__CampaignSessionClient<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignSessionFindFirstOrThrowArgs} args - Arguments to find a CampaignSession
     * @example
     * // Get one CampaignSession
     * const campaignSession = await prisma.campaignSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignSessionClient<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignSessions
     * const campaignSessions = await prisma.campaignSession.findMany()
     * 
     * // Get first 10 CampaignSessions
     * const campaignSessions = await prisma.campaignSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignSessionWithIdOnly = await prisma.campaignSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignSessionFindManyArgs>(args?: SelectSubset<T, CampaignSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignSession.
     * @param {CampaignSessionCreateArgs} args - Arguments to create a CampaignSession.
     * @example
     * // Create one CampaignSession
     * const CampaignSession = await prisma.campaignSession.create({
     *   data: {
     *     // ... data to create a CampaignSession
     *   }
     * })
     * 
     */
    create<T extends CampaignSessionCreateArgs>(args: SelectSubset<T, CampaignSessionCreateArgs<ExtArgs>>): Prisma__CampaignSessionClient<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignSessions.
     * @param {CampaignSessionCreateManyArgs} args - Arguments to create many CampaignSessions.
     * @example
     * // Create many CampaignSessions
     * const campaignSession = await prisma.campaignSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignSessionCreateManyArgs>(args?: SelectSubset<T, CampaignSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampaignSessions and returns the data saved in the database.
     * @param {CampaignSessionCreateManyAndReturnArgs} args - Arguments to create many CampaignSessions.
     * @example
     * // Create many CampaignSessions
     * const campaignSession = await prisma.campaignSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampaignSessions and only return the `id`
     * const campaignSessionWithIdOnly = await prisma.campaignSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampaignSession.
     * @param {CampaignSessionDeleteArgs} args - Arguments to delete one CampaignSession.
     * @example
     * // Delete one CampaignSession
     * const CampaignSession = await prisma.campaignSession.delete({
     *   where: {
     *     // ... filter to delete one CampaignSession
     *   }
     * })
     * 
     */
    delete<T extends CampaignSessionDeleteArgs>(args: SelectSubset<T, CampaignSessionDeleteArgs<ExtArgs>>): Prisma__CampaignSessionClient<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignSession.
     * @param {CampaignSessionUpdateArgs} args - Arguments to update one CampaignSession.
     * @example
     * // Update one CampaignSession
     * const campaignSession = await prisma.campaignSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignSessionUpdateArgs>(args: SelectSubset<T, CampaignSessionUpdateArgs<ExtArgs>>): Prisma__CampaignSessionClient<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignSessions.
     * @param {CampaignSessionDeleteManyArgs} args - Arguments to filter CampaignSessions to delete.
     * @example
     * // Delete a few CampaignSessions
     * const { count } = await prisma.campaignSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignSessionDeleteManyArgs>(args?: SelectSubset<T, CampaignSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignSessions
     * const campaignSession = await prisma.campaignSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignSessionUpdateManyArgs>(args: SelectSubset<T, CampaignSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignSessions and returns the data updated in the database.
     * @param {CampaignSessionUpdateManyAndReturnArgs} args - Arguments to update many CampaignSessions.
     * @example
     * // Update many CampaignSessions
     * const campaignSession = await prisma.campaignSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampaignSessions and only return the `id`
     * const campaignSessionWithIdOnly = await prisma.campaignSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends CampaignSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampaignSession.
     * @param {CampaignSessionUpsertArgs} args - Arguments to update or create a CampaignSession.
     * @example
     * // Update or create a CampaignSession
     * const campaignSession = await prisma.campaignSession.upsert({
     *   create: {
     *     // ... data to create a CampaignSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignSession we want to update
     *   }
     * })
     */
    upsert<T extends CampaignSessionUpsertArgs>(args: SelectSubset<T, CampaignSessionUpsertArgs<ExtArgs>>): Prisma__CampaignSessionClient<$Result.GetResult<Prisma.$CampaignSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampaignSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignSessionCountArgs} args - Arguments to filter CampaignSessions to count.
     * @example
     * // Count the number of CampaignSessions
     * const count = await prisma.campaignSession.count({
     *   where: {
     *     // ... the filter for the CampaignSessions we want to count
     *   }
     * })
    **/
    count<T extends CampaignSessionCountArgs>(
      args?: Subset<T, CampaignSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignSessionAggregateArgs>(args: Subset<T, CampaignSessionAggregateArgs>): Prisma.PrismaPromise<GetCampaignSessionAggregateType<T>>

    /**
     * Group by CampaignSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignSessionGroupByArgs} args - Group by arguments.
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
      T extends CampaignSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignSessionGroupByArgs['orderBy'] }
        : { orderBy?: CampaignSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignSession model
   */
  readonly fields: CampaignSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CampaignSession model
   */
  interface CampaignSessionFieldRefs {
    readonly id: FieldRef<"CampaignSession", 'String'>
    readonly campaignId: FieldRef<"CampaignSession", 'String'>
    readonly activeMapId: FieldRef<"CampaignSession", 'String'>
    readonly status: FieldRef<"CampaignSession", 'CampaignSessionStatus'>
    readonly startedAt: FieldRef<"CampaignSession", 'DateTime'>
    readonly endedAt: FieldRef<"CampaignSession", 'DateTime'>
    readonly createdByUserId: FieldRef<"CampaignSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CampaignSession findUnique
   */
  export type CampaignSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * Filter, which CampaignSession to fetch.
     */
    where: CampaignSessionWhereUniqueInput
  }

  /**
   * CampaignSession findUniqueOrThrow
   */
  export type CampaignSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * Filter, which CampaignSession to fetch.
     */
    where: CampaignSessionWhereUniqueInput
  }

  /**
   * CampaignSession findFirst
   */
  export type CampaignSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * Filter, which CampaignSession to fetch.
     */
    where?: CampaignSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignSessions to fetch.
     */
    orderBy?: CampaignSessionOrderByWithRelationInput | CampaignSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignSessions.
     */
    cursor?: CampaignSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignSessions.
     */
    distinct?: CampaignSessionScalarFieldEnum | CampaignSessionScalarFieldEnum[]
  }

  /**
   * CampaignSession findFirstOrThrow
   */
  export type CampaignSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * Filter, which CampaignSession to fetch.
     */
    where?: CampaignSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignSessions to fetch.
     */
    orderBy?: CampaignSessionOrderByWithRelationInput | CampaignSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignSessions.
     */
    cursor?: CampaignSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignSessions.
     */
    distinct?: CampaignSessionScalarFieldEnum | CampaignSessionScalarFieldEnum[]
  }

  /**
   * CampaignSession findMany
   */
  export type CampaignSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * Filter, which CampaignSessions to fetch.
     */
    where?: CampaignSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignSessions to fetch.
     */
    orderBy?: CampaignSessionOrderByWithRelationInput | CampaignSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignSessions.
     */
    cursor?: CampaignSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignSessions.
     */
    distinct?: CampaignSessionScalarFieldEnum | CampaignSessionScalarFieldEnum[]
  }

  /**
   * CampaignSession create
   */
  export type CampaignSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignSession.
     */
    data: XOR<CampaignSessionCreateInput, CampaignSessionUncheckedCreateInput>
  }

  /**
   * CampaignSession createMany
   */
  export type CampaignSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignSessions.
     */
    data: CampaignSessionCreateManyInput | CampaignSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampaignSession createManyAndReturn
   */
  export type CampaignSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * The data used to create many CampaignSessions.
     */
    data: CampaignSessionCreateManyInput | CampaignSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignSession update
   */
  export type CampaignSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignSession.
     */
    data: XOR<CampaignSessionUpdateInput, CampaignSessionUncheckedUpdateInput>
    /**
     * Choose, which CampaignSession to update.
     */
    where: CampaignSessionWhereUniqueInput
  }

  /**
   * CampaignSession updateMany
   */
  export type CampaignSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignSessions.
     */
    data: XOR<CampaignSessionUpdateManyMutationInput, CampaignSessionUncheckedUpdateManyInput>
    /**
     * Filter which CampaignSessions to update
     */
    where?: CampaignSessionWhereInput
    /**
     * Limit how many CampaignSessions to update.
     */
    limit?: number
  }

  /**
   * CampaignSession updateManyAndReturn
   */
  export type CampaignSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * The data used to update CampaignSessions.
     */
    data: XOR<CampaignSessionUpdateManyMutationInput, CampaignSessionUncheckedUpdateManyInput>
    /**
     * Filter which CampaignSessions to update
     */
    where?: CampaignSessionWhereInput
    /**
     * Limit how many CampaignSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignSession upsert
   */
  export type CampaignSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignSession to update in case it exists.
     */
    where: CampaignSessionWhereUniqueInput
    /**
     * In case the CampaignSession found by the `where` argument doesn't exist, create a new CampaignSession with this data.
     */
    create: XOR<CampaignSessionCreateInput, CampaignSessionUncheckedCreateInput>
    /**
     * In case the CampaignSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignSessionUpdateInput, CampaignSessionUncheckedUpdateInput>
  }

  /**
   * CampaignSession delete
   */
  export type CampaignSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
    /**
     * Filter which CampaignSession to delete.
     */
    where: CampaignSessionWhereUniqueInput
  }

  /**
   * CampaignSession deleteMany
   */
  export type CampaignSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignSessions to delete
     */
    where?: CampaignSessionWhereInput
    /**
     * Limit how many CampaignSessions to delete.
     */
    limit?: number
  }

  /**
   * CampaignSession without action
   */
  export type CampaignSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignSession
     */
    select?: CampaignSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignSession
     */
    omit?: CampaignSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignSessionInclude<ExtArgs> | null
  }


  /**
   * Model Map
   */

  export type AggregateMap = {
    _count: MapCountAggregateOutputType | null
    _avg: MapAvgAggregateOutputType | null
    _sum: MapSumAggregateOutputType | null
    _min: MapMinAggregateOutputType | null
    _max: MapMaxAggregateOutputType | null
  }

  export type MapAvgAggregateOutputType = {
    width: number | null
    height: number | null
    cellSize: number | null
    backgroundOffsetX: number | null
    backgroundOffsetY: number | null
    backgroundScale: number | null
    gridOffsetX: number | null
    gridOffsetY: number | null
    gridOpacity: number | null
    fogOpacity: number | null
    sortOrder: number | null
  }

  export type MapSumAggregateOutputType = {
    width: number | null
    height: number | null
    cellSize: number | null
    backgroundOffsetX: number | null
    backgroundOffsetY: number | null
    backgroundScale: number | null
    gridOffsetX: number | null
    gridOffsetY: number | null
    gridOpacity: number | null
    fogOpacity: number | null
    sortOrder: number | null
  }

  export type MapMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    name: string | null
    width: number | null
    height: number | null
    cellSize: number | null
    gridType: $Enums.GridType | null
    backgroundImage: string | null
    backgroundFitMode: string | null
    backgroundOffsetX: number | null
    backgroundOffsetY: number | null
    backgroundScale: number | null
    gridOffsetX: number | null
    gridOffsetY: number | null
    gridColor: string | null
    gridOpacity: number | null
    fogEnabled: boolean | null
    fogMode: string | null
    fogOpacity: number | null
    fogPlayersSeeExplored: boolean | null
    sortOrder: number | null
    isArchived: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type MapMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    name: string | null
    width: number | null
    height: number | null
    cellSize: number | null
    gridType: $Enums.GridType | null
    backgroundImage: string | null
    backgroundFitMode: string | null
    backgroundOffsetX: number | null
    backgroundOffsetY: number | null
    backgroundScale: number | null
    gridOffsetX: number | null
    gridOffsetY: number | null
    gridColor: string | null
    gridOpacity: number | null
    fogEnabled: boolean | null
    fogMode: string | null
    fogOpacity: number | null
    fogPlayersSeeExplored: boolean | null
    sortOrder: number | null
    isArchived: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type MapCountAggregateOutputType = {
    id: number
    campaignId: number
    name: number
    width: number
    height: number
    cellSize: number
    gridType: number
    backgroundImage: number
    backgroundFitMode: number
    backgroundOffsetX: number
    backgroundOffsetY: number
    backgroundScale: number
    gridOffsetX: number
    gridOffsetY: number
    gridColor: number
    gridOpacity: number
    fogEnabled: number
    fogMode: number
    fogOpacity: number
    fogPlayersSeeExplored: number
    layerConfigJson: number
    sortOrder: number
    isArchived: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type MapAvgAggregateInputType = {
    width?: true
    height?: true
    cellSize?: true
    backgroundOffsetX?: true
    backgroundOffsetY?: true
    backgroundScale?: true
    gridOffsetX?: true
    gridOffsetY?: true
    gridOpacity?: true
    fogOpacity?: true
    sortOrder?: true
  }

  export type MapSumAggregateInputType = {
    width?: true
    height?: true
    cellSize?: true
    backgroundOffsetX?: true
    backgroundOffsetY?: true
    backgroundScale?: true
    gridOffsetX?: true
    gridOffsetY?: true
    gridOpacity?: true
    fogOpacity?: true
    sortOrder?: true
  }

  export type MapMinAggregateInputType = {
    id?: true
    campaignId?: true
    name?: true
    width?: true
    height?: true
    cellSize?: true
    gridType?: true
    backgroundImage?: true
    backgroundFitMode?: true
    backgroundOffsetX?: true
    backgroundOffsetY?: true
    backgroundScale?: true
    gridOffsetX?: true
    gridOffsetY?: true
    gridColor?: true
    gridOpacity?: true
    fogEnabled?: true
    fogMode?: true
    fogOpacity?: true
    fogPlayersSeeExplored?: true
    sortOrder?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type MapMaxAggregateInputType = {
    id?: true
    campaignId?: true
    name?: true
    width?: true
    height?: true
    cellSize?: true
    gridType?: true
    backgroundImage?: true
    backgroundFitMode?: true
    backgroundOffsetX?: true
    backgroundOffsetY?: true
    backgroundScale?: true
    gridOffsetX?: true
    gridOffsetY?: true
    gridColor?: true
    gridOpacity?: true
    fogEnabled?: true
    fogMode?: true
    fogOpacity?: true
    fogPlayersSeeExplored?: true
    sortOrder?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type MapCountAggregateInputType = {
    id?: true
    campaignId?: true
    name?: true
    width?: true
    height?: true
    cellSize?: true
    gridType?: true
    backgroundImage?: true
    backgroundFitMode?: true
    backgroundOffsetX?: true
    backgroundOffsetY?: true
    backgroundScale?: true
    gridOffsetX?: true
    gridOffsetY?: true
    gridColor?: true
    gridOpacity?: true
    fogEnabled?: true
    fogMode?: true
    fogOpacity?: true
    fogPlayersSeeExplored?: true
    layerConfigJson?: true
    sortOrder?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type MapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Map to aggregate.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Maps
    **/
    _count?: true | MapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MapMaxAggregateInputType
  }

  export type GetMapAggregateType<T extends MapAggregateArgs> = {
        [P in keyof T & keyof AggregateMap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMap[P]>
      : GetScalarType<T[P], AggregateMap[P]>
  }




  export type MapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapWhereInput
    orderBy?: MapOrderByWithAggregationInput | MapOrderByWithAggregationInput[]
    by: MapScalarFieldEnum[] | MapScalarFieldEnum
    having?: MapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MapCountAggregateInputType | true
    _avg?: MapAvgAggregateInputType
    _sum?: MapSumAggregateInputType
    _min?: MapMinAggregateInputType
    _max?: MapMaxAggregateInputType
  }

  export type MapGroupByOutputType = {
    id: string
    campaignId: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType: $Enums.GridType
    backgroundImage: string | null
    backgroundFitMode: string
    backgroundOffsetX: number
    backgroundOffsetY: number
    backgroundScale: number
    gridOffsetX: number
    gridOffsetY: number
    gridColor: string
    gridOpacity: number
    fogEnabled: boolean
    fogMode: string
    fogOpacity: number
    fogPlayersSeeExplored: boolean
    layerConfigJson: JsonValue | null
    sortOrder: number
    isArchived: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: MapCountAggregateOutputType | null
    _avg: MapAvgAggregateOutputType | null
    _sum: MapSumAggregateOutputType | null
    _min: MapMinAggregateOutputType | null
    _max: MapMaxAggregateOutputType | null
  }

  type GetMapGroupByPayload<T extends MapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MapGroupByOutputType[P]>
            : GetScalarType<T[P], MapGroupByOutputType[P]>
        }
      >
    >


  export type MapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    cellSize?: boolean
    gridType?: boolean
    backgroundImage?: boolean
    backgroundFitMode?: boolean
    backgroundOffsetX?: boolean
    backgroundOffsetY?: boolean
    backgroundScale?: boolean
    gridOffsetX?: boolean
    gridOffsetY?: boolean
    gridColor?: boolean
    gridOpacity?: boolean
    fogEnabled?: boolean
    fogMode?: boolean
    fogOpacity?: boolean
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: boolean
    sortOrder?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    tokens?: boolean | Map$tokensArgs<ExtArgs>
    _count?: boolean | MapCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["map"]>

  export type MapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    cellSize?: boolean
    gridType?: boolean
    backgroundImage?: boolean
    backgroundFitMode?: boolean
    backgroundOffsetX?: boolean
    backgroundOffsetY?: boolean
    backgroundScale?: boolean
    gridOffsetX?: boolean
    gridOffsetY?: boolean
    gridColor?: boolean
    gridOpacity?: boolean
    fogEnabled?: boolean
    fogMode?: boolean
    fogOpacity?: boolean
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: boolean
    sortOrder?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["map"]>

  export type MapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    cellSize?: boolean
    gridType?: boolean
    backgroundImage?: boolean
    backgroundFitMode?: boolean
    backgroundOffsetX?: boolean
    backgroundOffsetY?: boolean
    backgroundScale?: boolean
    gridOffsetX?: boolean
    gridOffsetY?: boolean
    gridColor?: boolean
    gridOpacity?: boolean
    fogEnabled?: boolean
    fogMode?: boolean
    fogOpacity?: boolean
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: boolean
    sortOrder?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["map"]>

  export type MapSelectScalar = {
    id?: boolean
    campaignId?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    cellSize?: boolean
    gridType?: boolean
    backgroundImage?: boolean
    backgroundFitMode?: boolean
    backgroundOffsetX?: boolean
    backgroundOffsetY?: boolean
    backgroundScale?: boolean
    gridOffsetX?: boolean
    gridOffsetY?: boolean
    gridColor?: boolean
    gridOpacity?: boolean
    fogEnabled?: boolean
    fogMode?: boolean
    fogOpacity?: boolean
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: boolean
    sortOrder?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type MapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "name" | "width" | "height" | "cellSize" | "gridType" | "backgroundImage" | "backgroundFitMode" | "backgroundOffsetX" | "backgroundOffsetY" | "backgroundScale" | "gridOffsetX" | "gridOffsetY" | "gridColor" | "gridOpacity" | "fogEnabled" | "fogMode" | "fogOpacity" | "fogPlayersSeeExplored" | "layerConfigJson" | "sortOrder" | "isArchived" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["map"]>
  export type MapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    tokens?: boolean | Map$tokensArgs<ExtArgs>
    _count?: boolean | MapCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type MapIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }

  export type $MapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Map"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      tokens: Prisma.$MapTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      name: string
      width: number
      height: number
      cellSize: number
      gridType: $Enums.GridType
      backgroundImage: string | null
      backgroundFitMode: string
      backgroundOffsetX: number
      backgroundOffsetY: number
      backgroundScale: number
      gridOffsetX: number
      gridOffsetY: number
      gridColor: string
      gridOpacity: number
      fogEnabled: boolean
      fogMode: string
      fogOpacity: number
      fogPlayersSeeExplored: boolean
      layerConfigJson: Prisma.JsonValue | null
      sortOrder: number
      isArchived: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["map"]>
    composites: {}
  }

  type MapGetPayload<S extends boolean | null | undefined | MapDefaultArgs> = $Result.GetResult<Prisma.$MapPayload, S>

  type MapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MapCountAggregateInputType | true
    }

  export interface MapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Map'], meta: { name: 'Map' } }
    /**
     * Find zero or one Map that matches the filter.
     * @param {MapFindUniqueArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MapFindUniqueArgs>(args: SelectSubset<T, MapFindUniqueArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Map that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MapFindUniqueOrThrowArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MapFindUniqueOrThrowArgs>(args: SelectSubset<T, MapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Map that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindFirstArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MapFindFirstArgs>(args?: SelectSubset<T, MapFindFirstArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Map that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindFirstOrThrowArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MapFindFirstOrThrowArgs>(args?: SelectSubset<T, MapFindFirstOrThrowArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Maps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Maps
     * const maps = await prisma.map.findMany()
     * 
     * // Get first 10 Maps
     * const maps = await prisma.map.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mapWithIdOnly = await prisma.map.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MapFindManyArgs>(args?: SelectSubset<T, MapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Map.
     * @param {MapCreateArgs} args - Arguments to create a Map.
     * @example
     * // Create one Map
     * const Map = await prisma.map.create({
     *   data: {
     *     // ... data to create a Map
     *   }
     * })
     * 
     */
    create<T extends MapCreateArgs>(args: SelectSubset<T, MapCreateArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Maps.
     * @param {MapCreateManyArgs} args - Arguments to create many Maps.
     * @example
     * // Create many Maps
     * const map = await prisma.map.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MapCreateManyArgs>(args?: SelectSubset<T, MapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Maps and returns the data saved in the database.
     * @param {MapCreateManyAndReturnArgs} args - Arguments to create many Maps.
     * @example
     * // Create many Maps
     * const map = await prisma.map.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Maps and only return the `id`
     * const mapWithIdOnly = await prisma.map.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MapCreateManyAndReturnArgs>(args?: SelectSubset<T, MapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Map.
     * @param {MapDeleteArgs} args - Arguments to delete one Map.
     * @example
     * // Delete one Map
     * const Map = await prisma.map.delete({
     *   where: {
     *     // ... filter to delete one Map
     *   }
     * })
     * 
     */
    delete<T extends MapDeleteArgs>(args: SelectSubset<T, MapDeleteArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Map.
     * @param {MapUpdateArgs} args - Arguments to update one Map.
     * @example
     * // Update one Map
     * const map = await prisma.map.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MapUpdateArgs>(args: SelectSubset<T, MapUpdateArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Maps.
     * @param {MapDeleteManyArgs} args - Arguments to filter Maps to delete.
     * @example
     * // Delete a few Maps
     * const { count } = await prisma.map.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MapDeleteManyArgs>(args?: SelectSubset<T, MapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Maps
     * const map = await prisma.map.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MapUpdateManyArgs>(args: SelectSubset<T, MapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Maps and returns the data updated in the database.
     * @param {MapUpdateManyAndReturnArgs} args - Arguments to update many Maps.
     * @example
     * // Update many Maps
     * const map = await prisma.map.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Maps and only return the `id`
     * const mapWithIdOnly = await prisma.map.updateManyAndReturn({
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
    updateManyAndReturn<T extends MapUpdateManyAndReturnArgs>(args: SelectSubset<T, MapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Map.
     * @param {MapUpsertArgs} args - Arguments to update or create a Map.
     * @example
     * // Update or create a Map
     * const map = await prisma.map.upsert({
     *   create: {
     *     // ... data to create a Map
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Map we want to update
     *   }
     * })
     */
    upsert<T extends MapUpsertArgs>(args: SelectSubset<T, MapUpsertArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapCountArgs} args - Arguments to filter Maps to count.
     * @example
     * // Count the number of Maps
     * const count = await prisma.map.count({
     *   where: {
     *     // ... the filter for the Maps we want to count
     *   }
     * })
    **/
    count<T extends MapCountArgs>(
      args?: Subset<T, MapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Map.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MapAggregateArgs>(args: Subset<T, MapAggregateArgs>): Prisma.PrismaPromise<GetMapAggregateType<T>>

    /**
     * Group by Map.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapGroupByArgs} args - Group by arguments.
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
      T extends MapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MapGroupByArgs['orderBy'] }
        : { orderBy?: MapGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Map model
   */
  readonly fields: MapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Map.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tokens<T extends Map$tokensArgs<ExtArgs> = {}>(args?: Subset<T, Map$tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Map model
   */
  interface MapFieldRefs {
    readonly id: FieldRef<"Map", 'String'>
    readonly campaignId: FieldRef<"Map", 'String'>
    readonly name: FieldRef<"Map", 'String'>
    readonly width: FieldRef<"Map", 'Int'>
    readonly height: FieldRef<"Map", 'Int'>
    readonly cellSize: FieldRef<"Map", 'Int'>
    readonly gridType: FieldRef<"Map", 'GridType'>
    readonly backgroundImage: FieldRef<"Map", 'String'>
    readonly backgroundFitMode: FieldRef<"Map", 'String'>
    readonly backgroundOffsetX: FieldRef<"Map", 'Int'>
    readonly backgroundOffsetY: FieldRef<"Map", 'Int'>
    readonly backgroundScale: FieldRef<"Map", 'Float'>
    readonly gridOffsetX: FieldRef<"Map", 'Int'>
    readonly gridOffsetY: FieldRef<"Map", 'Int'>
    readonly gridColor: FieldRef<"Map", 'String'>
    readonly gridOpacity: FieldRef<"Map", 'Float'>
    readonly fogEnabled: FieldRef<"Map", 'Boolean'>
    readonly fogMode: FieldRef<"Map", 'String'>
    readonly fogOpacity: FieldRef<"Map", 'Float'>
    readonly fogPlayersSeeExplored: FieldRef<"Map", 'Boolean'>
    readonly layerConfigJson: FieldRef<"Map", 'Json'>
    readonly sortOrder: FieldRef<"Map", 'Int'>
    readonly isArchived: FieldRef<"Map", 'Boolean'>
    readonly createdAt: FieldRef<"Map", 'DateTime'>
    readonly updatedAt: FieldRef<"Map", 'DateTime'>
    readonly deletedAt: FieldRef<"Map", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Map findUnique
   */
  export type MapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map findUniqueOrThrow
   */
  export type MapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map findFirst
   */
  export type MapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Maps.
     */
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map findFirstOrThrow
   */
  export type MapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Maps.
     */
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map findMany
   */
  export type MapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Maps to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Maps.
     */
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map create
   */
  export type MapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The data needed to create a Map.
     */
    data: XOR<MapCreateInput, MapUncheckedCreateInput>
  }

  /**
   * Map createMany
   */
  export type MapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Maps.
     */
    data: MapCreateManyInput | MapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Map createManyAndReturn
   */
  export type MapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * The data used to create many Maps.
     */
    data: MapCreateManyInput | MapCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Map update
   */
  export type MapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The data needed to update a Map.
     */
    data: XOR<MapUpdateInput, MapUncheckedUpdateInput>
    /**
     * Choose, which Map to update.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map updateMany
   */
  export type MapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Maps.
     */
    data: XOR<MapUpdateManyMutationInput, MapUncheckedUpdateManyInput>
    /**
     * Filter which Maps to update
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to update.
     */
    limit?: number
  }

  /**
   * Map updateManyAndReturn
   */
  export type MapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * The data used to update Maps.
     */
    data: XOR<MapUpdateManyMutationInput, MapUncheckedUpdateManyInput>
    /**
     * Filter which Maps to update
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Map upsert
   */
  export type MapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The filter to search for the Map to update in case it exists.
     */
    where: MapWhereUniqueInput
    /**
     * In case the Map found by the `where` argument doesn't exist, create a new Map with this data.
     */
    create: XOR<MapCreateInput, MapUncheckedCreateInput>
    /**
     * In case the Map was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MapUpdateInput, MapUncheckedUpdateInput>
  }

  /**
   * Map delete
   */
  export type MapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter which Map to delete.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map deleteMany
   */
  export type MapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Maps to delete
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to delete.
     */
    limit?: number
  }

  /**
   * Map.tokens
   */
  export type Map$tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    where?: MapTokenWhereInput
    orderBy?: MapTokenOrderByWithRelationInput | MapTokenOrderByWithRelationInput[]
    cursor?: MapTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MapTokenScalarFieldEnum | MapTokenScalarFieldEnum[]
  }

  /**
   * Map without action
   */
  export type MapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
  }


  /**
   * Model MapToken
   */

  export type AggregateMapToken = {
    _count: MapTokenCountAggregateOutputType | null
    _avg: MapTokenAvgAggregateOutputType | null
    _sum: MapTokenSumAggregateOutputType | null
    _min: MapTokenMinAggregateOutputType | null
    _max: MapTokenMaxAggregateOutputType | null
  }

  export type MapTokenAvgAggregateOutputType = {
    x: number | null
    y: number | null
    widthCells: number | null
    heightCells: number | null
    rotation: number | null
    zIndex: number | null
    scaleX: number | null
    scaleY: number | null
    elevation: number | null
  }

  export type MapTokenSumAggregateOutputType = {
    x: number | null
    y: number | null
    widthCells: number | null
    heightCells: number | null
    rotation: number | null
    zIndex: number | null
    scaleX: number | null
    scaleY: number | null
    elevation: number | null
  }

  export type MapTokenMinAggregateOutputType = {
    id: string | null
    mapId: string | null
    characterId: string | null
    name: string | null
    image: string | null
    x: number | null
    y: number | null
    widthCells: number | null
    heightCells: number | null
    rotation: number | null
    zIndex: number | null
    scaleX: number | null
    scaleY: number | null
    layerKey: string | null
    visibility: $Enums.TokenVisibility | null
    isLocked: boolean | null
    isHidden: boolean | null
    elevation: number | null
    standMode: string | null
    disposition: $Enums.TokenDisposition | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type MapTokenMaxAggregateOutputType = {
    id: string | null
    mapId: string | null
    characterId: string | null
    name: string | null
    image: string | null
    x: number | null
    y: number | null
    widthCells: number | null
    heightCells: number | null
    rotation: number | null
    zIndex: number | null
    scaleX: number | null
    scaleY: number | null
    layerKey: string | null
    visibility: $Enums.TokenVisibility | null
    isLocked: boolean | null
    isHidden: boolean | null
    elevation: number | null
    standMode: string | null
    disposition: $Enums.TokenDisposition | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type MapTokenCountAggregateOutputType = {
    id: number
    mapId: number
    characterId: number
    name: number
    image: number
    x: number
    y: number
    widthCells: number
    heightCells: number
    rotation: number
    zIndex: number
    scaleX: number
    scaleY: number
    layerKey: number
    visibility: number
    isLocked: number
    isHidden: number
    elevation: number
    standMode: number
    barsJson: number
    statusJson: number
    visionJson: number
    lightJson: number
    disposition: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type MapTokenAvgAggregateInputType = {
    x?: true
    y?: true
    widthCells?: true
    heightCells?: true
    rotation?: true
    zIndex?: true
    scaleX?: true
    scaleY?: true
    elevation?: true
  }

  export type MapTokenSumAggregateInputType = {
    x?: true
    y?: true
    widthCells?: true
    heightCells?: true
    rotation?: true
    zIndex?: true
    scaleX?: true
    scaleY?: true
    elevation?: true
  }

  export type MapTokenMinAggregateInputType = {
    id?: true
    mapId?: true
    characterId?: true
    name?: true
    image?: true
    x?: true
    y?: true
    widthCells?: true
    heightCells?: true
    rotation?: true
    zIndex?: true
    scaleX?: true
    scaleY?: true
    layerKey?: true
    visibility?: true
    isLocked?: true
    isHidden?: true
    elevation?: true
    standMode?: true
    disposition?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type MapTokenMaxAggregateInputType = {
    id?: true
    mapId?: true
    characterId?: true
    name?: true
    image?: true
    x?: true
    y?: true
    widthCells?: true
    heightCells?: true
    rotation?: true
    zIndex?: true
    scaleX?: true
    scaleY?: true
    layerKey?: true
    visibility?: true
    isLocked?: true
    isHidden?: true
    elevation?: true
    standMode?: true
    disposition?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type MapTokenCountAggregateInputType = {
    id?: true
    mapId?: true
    characterId?: true
    name?: true
    image?: true
    x?: true
    y?: true
    widthCells?: true
    heightCells?: true
    rotation?: true
    zIndex?: true
    scaleX?: true
    scaleY?: true
    layerKey?: true
    visibility?: true
    isLocked?: true
    isHidden?: true
    elevation?: true
    standMode?: true
    barsJson?: true
    statusJson?: true
    visionJson?: true
    lightJson?: true
    disposition?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type MapTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MapToken to aggregate.
     */
    where?: MapTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapTokens to fetch.
     */
    orderBy?: MapTokenOrderByWithRelationInput | MapTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MapTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MapTokens
    **/
    _count?: true | MapTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MapTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MapTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MapTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MapTokenMaxAggregateInputType
  }

  export type GetMapTokenAggregateType<T extends MapTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateMapToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMapToken[P]>
      : GetScalarType<T[P], AggregateMapToken[P]>
  }




  export type MapTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapTokenWhereInput
    orderBy?: MapTokenOrderByWithAggregationInput | MapTokenOrderByWithAggregationInput[]
    by: MapTokenScalarFieldEnum[] | MapTokenScalarFieldEnum
    having?: MapTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MapTokenCountAggregateInputType | true
    _avg?: MapTokenAvgAggregateInputType
    _sum?: MapTokenSumAggregateInputType
    _min?: MapTokenMinAggregateInputType
    _max?: MapTokenMaxAggregateInputType
  }

  export type MapTokenGroupByOutputType = {
    id: string
    mapId: string
    characterId: string | null
    name: string | null
    image: string | null
    x: number
    y: number
    widthCells: number
    heightCells: number
    rotation: number
    zIndex: number
    scaleX: number
    scaleY: number
    layerKey: string
    visibility: $Enums.TokenVisibility
    isLocked: boolean
    isHidden: boolean
    elevation: number
    standMode: string
    barsJson: JsonValue | null
    statusJson: JsonValue | null
    visionJson: JsonValue | null
    lightJson: JsonValue | null
    disposition: $Enums.TokenDisposition
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: MapTokenCountAggregateOutputType | null
    _avg: MapTokenAvgAggregateOutputType | null
    _sum: MapTokenSumAggregateOutputType | null
    _min: MapTokenMinAggregateOutputType | null
    _max: MapTokenMaxAggregateOutputType | null
  }

  type GetMapTokenGroupByPayload<T extends MapTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MapTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MapTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MapTokenGroupByOutputType[P]>
            : GetScalarType<T[P], MapTokenGroupByOutputType[P]>
        }
      >
    >


  export type MapTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    characterId?: boolean
    name?: boolean
    image?: boolean
    x?: boolean
    y?: boolean
    widthCells?: boolean
    heightCells?: boolean
    rotation?: boolean
    zIndex?: boolean
    scaleX?: boolean
    scaleY?: boolean
    layerKey?: boolean
    visibility?: boolean
    isLocked?: boolean
    isHidden?: boolean
    elevation?: boolean
    standMode?: boolean
    barsJson?: boolean
    statusJson?: boolean
    visionJson?: boolean
    lightJson?: boolean
    disposition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    character?: boolean | MapToken$characterArgs<ExtArgs>
  }, ExtArgs["result"]["mapToken"]>

  export type MapTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    characterId?: boolean
    name?: boolean
    image?: boolean
    x?: boolean
    y?: boolean
    widthCells?: boolean
    heightCells?: boolean
    rotation?: boolean
    zIndex?: boolean
    scaleX?: boolean
    scaleY?: boolean
    layerKey?: boolean
    visibility?: boolean
    isLocked?: boolean
    isHidden?: boolean
    elevation?: boolean
    standMode?: boolean
    barsJson?: boolean
    statusJson?: boolean
    visionJson?: boolean
    lightJson?: boolean
    disposition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    character?: boolean | MapToken$characterArgs<ExtArgs>
  }, ExtArgs["result"]["mapToken"]>

  export type MapTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    characterId?: boolean
    name?: boolean
    image?: boolean
    x?: boolean
    y?: boolean
    widthCells?: boolean
    heightCells?: boolean
    rotation?: boolean
    zIndex?: boolean
    scaleX?: boolean
    scaleY?: boolean
    layerKey?: boolean
    visibility?: boolean
    isLocked?: boolean
    isHidden?: boolean
    elevation?: boolean
    standMode?: boolean
    barsJson?: boolean
    statusJson?: boolean
    visionJson?: boolean
    lightJson?: boolean
    disposition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    character?: boolean | MapToken$characterArgs<ExtArgs>
  }, ExtArgs["result"]["mapToken"]>

  export type MapTokenSelectScalar = {
    id?: boolean
    mapId?: boolean
    characterId?: boolean
    name?: boolean
    image?: boolean
    x?: boolean
    y?: boolean
    widthCells?: boolean
    heightCells?: boolean
    rotation?: boolean
    zIndex?: boolean
    scaleX?: boolean
    scaleY?: boolean
    layerKey?: boolean
    visibility?: boolean
    isLocked?: boolean
    isHidden?: boolean
    elevation?: boolean
    standMode?: boolean
    barsJson?: boolean
    statusJson?: boolean
    visionJson?: boolean
    lightJson?: boolean
    disposition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type MapTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mapId" | "characterId" | "name" | "image" | "x" | "y" | "widthCells" | "heightCells" | "rotation" | "zIndex" | "scaleX" | "scaleY" | "layerKey" | "visibility" | "isLocked" | "isHidden" | "elevation" | "standMode" | "barsJson" | "statusJson" | "visionJson" | "lightJson" | "disposition" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["mapToken"]>
  export type MapTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    character?: boolean | MapToken$characterArgs<ExtArgs>
  }
  export type MapTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    character?: boolean | MapToken$characterArgs<ExtArgs>
  }
  export type MapTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    character?: boolean | MapToken$characterArgs<ExtArgs>
  }

  export type $MapTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MapToken"
    objects: {
      map: Prisma.$MapPayload<ExtArgs>
      character: Prisma.$CharacterPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mapId: string
      characterId: string | null
      name: string | null
      image: string | null
      x: number
      y: number
      widthCells: number
      heightCells: number
      rotation: number
      zIndex: number
      scaleX: number
      scaleY: number
      layerKey: string
      visibility: $Enums.TokenVisibility
      isLocked: boolean
      isHidden: boolean
      elevation: number
      standMode: string
      barsJson: Prisma.JsonValue | null
      statusJson: Prisma.JsonValue | null
      visionJson: Prisma.JsonValue | null
      lightJson: Prisma.JsonValue | null
      disposition: $Enums.TokenDisposition
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["mapToken"]>
    composites: {}
  }

  type MapTokenGetPayload<S extends boolean | null | undefined | MapTokenDefaultArgs> = $Result.GetResult<Prisma.$MapTokenPayload, S>

  type MapTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MapTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MapTokenCountAggregateInputType | true
    }

  export interface MapTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MapToken'], meta: { name: 'MapToken' } }
    /**
     * Find zero or one MapToken that matches the filter.
     * @param {MapTokenFindUniqueArgs} args - Arguments to find a MapToken
     * @example
     * // Get one MapToken
     * const mapToken = await prisma.mapToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MapTokenFindUniqueArgs>(args: SelectSubset<T, MapTokenFindUniqueArgs<ExtArgs>>): Prisma__MapTokenClient<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MapToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MapTokenFindUniqueOrThrowArgs} args - Arguments to find a MapToken
     * @example
     * // Get one MapToken
     * const mapToken = await prisma.mapToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MapTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, MapTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MapTokenClient<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MapToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapTokenFindFirstArgs} args - Arguments to find a MapToken
     * @example
     * // Get one MapToken
     * const mapToken = await prisma.mapToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MapTokenFindFirstArgs>(args?: SelectSubset<T, MapTokenFindFirstArgs<ExtArgs>>): Prisma__MapTokenClient<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MapToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapTokenFindFirstOrThrowArgs} args - Arguments to find a MapToken
     * @example
     * // Get one MapToken
     * const mapToken = await prisma.mapToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MapTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, MapTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__MapTokenClient<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MapTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MapTokens
     * const mapTokens = await prisma.mapToken.findMany()
     * 
     * // Get first 10 MapTokens
     * const mapTokens = await prisma.mapToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mapTokenWithIdOnly = await prisma.mapToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MapTokenFindManyArgs>(args?: SelectSubset<T, MapTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MapToken.
     * @param {MapTokenCreateArgs} args - Arguments to create a MapToken.
     * @example
     * // Create one MapToken
     * const MapToken = await prisma.mapToken.create({
     *   data: {
     *     // ... data to create a MapToken
     *   }
     * })
     * 
     */
    create<T extends MapTokenCreateArgs>(args: SelectSubset<T, MapTokenCreateArgs<ExtArgs>>): Prisma__MapTokenClient<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MapTokens.
     * @param {MapTokenCreateManyArgs} args - Arguments to create many MapTokens.
     * @example
     * // Create many MapTokens
     * const mapToken = await prisma.mapToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MapTokenCreateManyArgs>(args?: SelectSubset<T, MapTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MapTokens and returns the data saved in the database.
     * @param {MapTokenCreateManyAndReturnArgs} args - Arguments to create many MapTokens.
     * @example
     * // Create many MapTokens
     * const mapToken = await prisma.mapToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MapTokens and only return the `id`
     * const mapTokenWithIdOnly = await prisma.mapToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MapTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, MapTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MapToken.
     * @param {MapTokenDeleteArgs} args - Arguments to delete one MapToken.
     * @example
     * // Delete one MapToken
     * const MapToken = await prisma.mapToken.delete({
     *   where: {
     *     // ... filter to delete one MapToken
     *   }
     * })
     * 
     */
    delete<T extends MapTokenDeleteArgs>(args: SelectSubset<T, MapTokenDeleteArgs<ExtArgs>>): Prisma__MapTokenClient<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MapToken.
     * @param {MapTokenUpdateArgs} args - Arguments to update one MapToken.
     * @example
     * // Update one MapToken
     * const mapToken = await prisma.mapToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MapTokenUpdateArgs>(args: SelectSubset<T, MapTokenUpdateArgs<ExtArgs>>): Prisma__MapTokenClient<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MapTokens.
     * @param {MapTokenDeleteManyArgs} args - Arguments to filter MapTokens to delete.
     * @example
     * // Delete a few MapTokens
     * const { count } = await prisma.mapToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MapTokenDeleteManyArgs>(args?: SelectSubset<T, MapTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MapTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MapTokens
     * const mapToken = await prisma.mapToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MapTokenUpdateManyArgs>(args: SelectSubset<T, MapTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MapTokens and returns the data updated in the database.
     * @param {MapTokenUpdateManyAndReturnArgs} args - Arguments to update many MapTokens.
     * @example
     * // Update many MapTokens
     * const mapToken = await prisma.mapToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MapTokens and only return the `id`
     * const mapTokenWithIdOnly = await prisma.mapToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends MapTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, MapTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MapToken.
     * @param {MapTokenUpsertArgs} args - Arguments to update or create a MapToken.
     * @example
     * // Update or create a MapToken
     * const mapToken = await prisma.mapToken.upsert({
     *   create: {
     *     // ... data to create a MapToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MapToken we want to update
     *   }
     * })
     */
    upsert<T extends MapTokenUpsertArgs>(args: SelectSubset<T, MapTokenUpsertArgs<ExtArgs>>): Prisma__MapTokenClient<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MapTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapTokenCountArgs} args - Arguments to filter MapTokens to count.
     * @example
     * // Count the number of MapTokens
     * const count = await prisma.mapToken.count({
     *   where: {
     *     // ... the filter for the MapTokens we want to count
     *   }
     * })
    **/
    count<T extends MapTokenCountArgs>(
      args?: Subset<T, MapTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MapTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MapToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MapTokenAggregateArgs>(args: Subset<T, MapTokenAggregateArgs>): Prisma.PrismaPromise<GetMapTokenAggregateType<T>>

    /**
     * Group by MapToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapTokenGroupByArgs} args - Group by arguments.
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
      T extends MapTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MapTokenGroupByArgs['orderBy'] }
        : { orderBy?: MapTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MapTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MapToken model
   */
  readonly fields: MapTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MapToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MapTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    map<T extends MapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MapDefaultArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    character<T extends MapToken$characterArgs<ExtArgs> = {}>(args?: Subset<T, MapToken$characterArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MapToken model
   */
  interface MapTokenFieldRefs {
    readonly id: FieldRef<"MapToken", 'String'>
    readonly mapId: FieldRef<"MapToken", 'String'>
    readonly characterId: FieldRef<"MapToken", 'String'>
    readonly name: FieldRef<"MapToken", 'String'>
    readonly image: FieldRef<"MapToken", 'String'>
    readonly x: FieldRef<"MapToken", 'Int'>
    readonly y: FieldRef<"MapToken", 'Int'>
    readonly widthCells: FieldRef<"MapToken", 'Int'>
    readonly heightCells: FieldRef<"MapToken", 'Int'>
    readonly rotation: FieldRef<"MapToken", 'Float'>
    readonly zIndex: FieldRef<"MapToken", 'Int'>
    readonly scaleX: FieldRef<"MapToken", 'Float'>
    readonly scaleY: FieldRef<"MapToken", 'Float'>
    readonly layerKey: FieldRef<"MapToken", 'String'>
    readonly visibility: FieldRef<"MapToken", 'TokenVisibility'>
    readonly isLocked: FieldRef<"MapToken", 'Boolean'>
    readonly isHidden: FieldRef<"MapToken", 'Boolean'>
    readonly elevation: FieldRef<"MapToken", 'Int'>
    readonly standMode: FieldRef<"MapToken", 'String'>
    readonly barsJson: FieldRef<"MapToken", 'Json'>
    readonly statusJson: FieldRef<"MapToken", 'Json'>
    readonly visionJson: FieldRef<"MapToken", 'Json'>
    readonly lightJson: FieldRef<"MapToken", 'Json'>
    readonly disposition: FieldRef<"MapToken", 'TokenDisposition'>
    readonly createdAt: FieldRef<"MapToken", 'DateTime'>
    readonly updatedAt: FieldRef<"MapToken", 'DateTime'>
    readonly deletedAt: FieldRef<"MapToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MapToken findUnique
   */
  export type MapTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * Filter, which MapToken to fetch.
     */
    where: MapTokenWhereUniqueInput
  }

  /**
   * MapToken findUniqueOrThrow
   */
  export type MapTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * Filter, which MapToken to fetch.
     */
    where: MapTokenWhereUniqueInput
  }

  /**
   * MapToken findFirst
   */
  export type MapTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * Filter, which MapToken to fetch.
     */
    where?: MapTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapTokens to fetch.
     */
    orderBy?: MapTokenOrderByWithRelationInput | MapTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MapTokens.
     */
    cursor?: MapTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MapTokens.
     */
    distinct?: MapTokenScalarFieldEnum | MapTokenScalarFieldEnum[]
  }

  /**
   * MapToken findFirstOrThrow
   */
  export type MapTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * Filter, which MapToken to fetch.
     */
    where?: MapTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapTokens to fetch.
     */
    orderBy?: MapTokenOrderByWithRelationInput | MapTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MapTokens.
     */
    cursor?: MapTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MapTokens.
     */
    distinct?: MapTokenScalarFieldEnum | MapTokenScalarFieldEnum[]
  }

  /**
   * MapToken findMany
   */
  export type MapTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * Filter, which MapTokens to fetch.
     */
    where?: MapTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapTokens to fetch.
     */
    orderBy?: MapTokenOrderByWithRelationInput | MapTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MapTokens.
     */
    cursor?: MapTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MapTokens.
     */
    distinct?: MapTokenScalarFieldEnum | MapTokenScalarFieldEnum[]
  }

  /**
   * MapToken create
   */
  export type MapTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a MapToken.
     */
    data: XOR<MapTokenCreateInput, MapTokenUncheckedCreateInput>
  }

  /**
   * MapToken createMany
   */
  export type MapTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MapTokens.
     */
    data: MapTokenCreateManyInput | MapTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MapToken createManyAndReturn
   */
  export type MapTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * The data used to create many MapTokens.
     */
    data: MapTokenCreateManyInput | MapTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MapToken update
   */
  export type MapTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a MapToken.
     */
    data: XOR<MapTokenUpdateInput, MapTokenUncheckedUpdateInput>
    /**
     * Choose, which MapToken to update.
     */
    where: MapTokenWhereUniqueInput
  }

  /**
   * MapToken updateMany
   */
  export type MapTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MapTokens.
     */
    data: XOR<MapTokenUpdateManyMutationInput, MapTokenUncheckedUpdateManyInput>
    /**
     * Filter which MapTokens to update
     */
    where?: MapTokenWhereInput
    /**
     * Limit how many MapTokens to update.
     */
    limit?: number
  }

  /**
   * MapToken updateManyAndReturn
   */
  export type MapTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * The data used to update MapTokens.
     */
    data: XOR<MapTokenUpdateManyMutationInput, MapTokenUncheckedUpdateManyInput>
    /**
     * Filter which MapTokens to update
     */
    where?: MapTokenWhereInput
    /**
     * Limit how many MapTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MapToken upsert
   */
  export type MapTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the MapToken to update in case it exists.
     */
    where: MapTokenWhereUniqueInput
    /**
     * In case the MapToken found by the `where` argument doesn't exist, create a new MapToken with this data.
     */
    create: XOR<MapTokenCreateInput, MapTokenUncheckedCreateInput>
    /**
     * In case the MapToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MapTokenUpdateInput, MapTokenUncheckedUpdateInput>
  }

  /**
   * MapToken delete
   */
  export type MapTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    /**
     * Filter which MapToken to delete.
     */
    where: MapTokenWhereUniqueInput
  }

  /**
   * MapToken deleteMany
   */
  export type MapTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MapTokens to delete
     */
    where?: MapTokenWhereInput
    /**
     * Limit how many MapTokens to delete.
     */
    limit?: number
  }

  /**
   * MapToken.character
   */
  export type MapToken$characterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    where?: CharacterWhereInput
  }

  /**
   * MapToken without action
   */
  export type MapTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
  }


  /**
   * Model Character
   */

  export type AggregateCharacter = {
    _count: CharacterCountAggregateOutputType | null
    _min: CharacterMinAggregateOutputType | null
    _max: CharacterMaxAggregateOutputType | null
  }

  export type CharacterMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    ownerUserId: string | null
    createdByUserId: string | null
    name: string | null
    type: $Enums.CharacterType | null
    visibility: $Enums.CharacterVisibility | null
    portraitImage: string | null
    defaultTokenImage: string | null
    system: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archivedAt: Date | null
  }

  export type CharacterMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    ownerUserId: string | null
    createdByUserId: string | null
    name: string | null
    type: $Enums.CharacterType | null
    visibility: $Enums.CharacterVisibility | null
    portraitImage: string | null
    defaultTokenImage: string | null
    system: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archivedAt: Date | null
  }

  export type CharacterCountAggregateOutputType = {
    id: number
    campaignId: number
    ownerUserId: number
    createdByUserId: number
    name: number
    type: number
    visibility: number
    portraitImage: number
    defaultTokenImage: number
    system: number
    createdAt: number
    updatedAt: number
    archivedAt: number
    _all: number
  }


  export type CharacterMinAggregateInputType = {
    id?: true
    campaignId?: true
    ownerUserId?: true
    createdByUserId?: true
    name?: true
    type?: true
    visibility?: true
    portraitImage?: true
    defaultTokenImage?: true
    system?: true
    createdAt?: true
    updatedAt?: true
    archivedAt?: true
  }

  export type CharacterMaxAggregateInputType = {
    id?: true
    campaignId?: true
    ownerUserId?: true
    createdByUserId?: true
    name?: true
    type?: true
    visibility?: true
    portraitImage?: true
    defaultTokenImage?: true
    system?: true
    createdAt?: true
    updatedAt?: true
    archivedAt?: true
  }

  export type CharacterCountAggregateInputType = {
    id?: true
    campaignId?: true
    ownerUserId?: true
    createdByUserId?: true
    name?: true
    type?: true
    visibility?: true
    portraitImage?: true
    defaultTokenImage?: true
    system?: true
    createdAt?: true
    updatedAt?: true
    archivedAt?: true
    _all?: true
  }

  export type CharacterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Character to aggregate.
     */
    where?: CharacterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Characters to fetch.
     */
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CharacterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Characters
    **/
    _count?: true | CharacterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharacterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharacterMaxAggregateInputType
  }

  export type GetCharacterAggregateType<T extends CharacterAggregateArgs> = {
        [P in keyof T & keyof AggregateCharacter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharacter[P]>
      : GetScalarType<T[P], AggregateCharacter[P]>
  }




  export type CharacterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharacterWhereInput
    orderBy?: CharacterOrderByWithAggregationInput | CharacterOrderByWithAggregationInput[]
    by: CharacterScalarFieldEnum[] | CharacterScalarFieldEnum
    having?: CharacterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharacterCountAggregateInputType | true
    _min?: CharacterMinAggregateInputType
    _max?: CharacterMaxAggregateInputType
  }

  export type CharacterGroupByOutputType = {
    id: string
    campaignId: string
    ownerUserId: string | null
    createdByUserId: string
    name: string
    type: $Enums.CharacterType
    visibility: $Enums.CharacterVisibility
    portraitImage: string | null
    defaultTokenImage: string | null
    system: string
    createdAt: Date
    updatedAt: Date
    archivedAt: Date | null
    _count: CharacterCountAggregateOutputType | null
    _min: CharacterMinAggregateOutputType | null
    _max: CharacterMaxAggregateOutputType | null
  }

  type GetCharacterGroupByPayload<T extends CharacterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharacterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharacterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharacterGroupByOutputType[P]>
            : GetScalarType<T[P], CharacterGroupByOutputType[P]>
        }
      >
    >


  export type CharacterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    ownerUserId?: boolean
    createdByUserId?: boolean
    name?: boolean
    type?: boolean
    visibility?: boolean
    portraitImage?: boolean
    defaultTokenImage?: boolean
    system?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archivedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    sheet?: boolean | Character$sheetArgs<ExtArgs>
    permissions?: boolean | Character$permissionsArgs<ExtArgs>
    tokens?: boolean | Character$tokensArgs<ExtArgs>
    _count?: boolean | CharacterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character"]>

  export type CharacterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    ownerUserId?: boolean
    createdByUserId?: boolean
    name?: boolean
    type?: boolean
    visibility?: boolean
    portraitImage?: boolean
    defaultTokenImage?: boolean
    system?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archivedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character"]>

  export type CharacterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    ownerUserId?: boolean
    createdByUserId?: boolean
    name?: boolean
    type?: boolean
    visibility?: boolean
    portraitImage?: boolean
    defaultTokenImage?: boolean
    system?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archivedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character"]>

  export type CharacterSelectScalar = {
    id?: boolean
    campaignId?: boolean
    ownerUserId?: boolean
    createdByUserId?: boolean
    name?: boolean
    type?: boolean
    visibility?: boolean
    portraitImage?: boolean
    defaultTokenImage?: boolean
    system?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archivedAt?: boolean
  }

  export type CharacterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "ownerUserId" | "createdByUserId" | "name" | "type" | "visibility" | "portraitImage" | "defaultTokenImage" | "system" | "createdAt" | "updatedAt" | "archivedAt", ExtArgs["result"]["character"]>
  export type CharacterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    sheet?: boolean | Character$sheetArgs<ExtArgs>
    permissions?: boolean | Character$permissionsArgs<ExtArgs>
    tokens?: boolean | Character$tokensArgs<ExtArgs>
    _count?: boolean | CharacterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CharacterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type CharacterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }

  export type $CharacterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Character"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      sheet: Prisma.$CharacterSheetPayload<ExtArgs> | null
      permissions: Prisma.$CharacterPermissionPayload<ExtArgs>[]
      tokens: Prisma.$MapTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      ownerUserId: string | null
      createdByUserId: string
      name: string
      type: $Enums.CharacterType
      visibility: $Enums.CharacterVisibility
      portraitImage: string | null
      defaultTokenImage: string | null
      system: string
      createdAt: Date
      updatedAt: Date
      archivedAt: Date | null
    }, ExtArgs["result"]["character"]>
    composites: {}
  }

  type CharacterGetPayload<S extends boolean | null | undefined | CharacterDefaultArgs> = $Result.GetResult<Prisma.$CharacterPayload, S>

  type CharacterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CharacterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CharacterCountAggregateInputType | true
    }

  export interface CharacterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Character'], meta: { name: 'Character' } }
    /**
     * Find zero or one Character that matches the filter.
     * @param {CharacterFindUniqueArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharacterFindUniqueArgs>(args: SelectSubset<T, CharacterFindUniqueArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Character that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharacterFindUniqueOrThrowArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharacterFindUniqueOrThrowArgs>(args: SelectSubset<T, CharacterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Character that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterFindFirstArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharacterFindFirstArgs>(args?: SelectSubset<T, CharacterFindFirstArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Character that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterFindFirstOrThrowArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharacterFindFirstOrThrowArgs>(args?: SelectSubset<T, CharacterFindFirstOrThrowArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Characters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Characters
     * const characters = await prisma.character.findMany()
     * 
     * // Get first 10 Characters
     * const characters = await prisma.character.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const characterWithIdOnly = await prisma.character.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CharacterFindManyArgs>(args?: SelectSubset<T, CharacterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Character.
     * @param {CharacterCreateArgs} args - Arguments to create a Character.
     * @example
     * // Create one Character
     * const Character = await prisma.character.create({
     *   data: {
     *     // ... data to create a Character
     *   }
     * })
     * 
     */
    create<T extends CharacterCreateArgs>(args: SelectSubset<T, CharacterCreateArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Characters.
     * @param {CharacterCreateManyArgs} args - Arguments to create many Characters.
     * @example
     * // Create many Characters
     * const character = await prisma.character.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CharacterCreateManyArgs>(args?: SelectSubset<T, CharacterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Characters and returns the data saved in the database.
     * @param {CharacterCreateManyAndReturnArgs} args - Arguments to create many Characters.
     * @example
     * // Create many Characters
     * const character = await prisma.character.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Characters and only return the `id`
     * const characterWithIdOnly = await prisma.character.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CharacterCreateManyAndReturnArgs>(args?: SelectSubset<T, CharacterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Character.
     * @param {CharacterDeleteArgs} args - Arguments to delete one Character.
     * @example
     * // Delete one Character
     * const Character = await prisma.character.delete({
     *   where: {
     *     // ... filter to delete one Character
     *   }
     * })
     * 
     */
    delete<T extends CharacterDeleteArgs>(args: SelectSubset<T, CharacterDeleteArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Character.
     * @param {CharacterUpdateArgs} args - Arguments to update one Character.
     * @example
     * // Update one Character
     * const character = await prisma.character.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CharacterUpdateArgs>(args: SelectSubset<T, CharacterUpdateArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Characters.
     * @param {CharacterDeleteManyArgs} args - Arguments to filter Characters to delete.
     * @example
     * // Delete a few Characters
     * const { count } = await prisma.character.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CharacterDeleteManyArgs>(args?: SelectSubset<T, CharacterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Characters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Characters
     * const character = await prisma.character.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CharacterUpdateManyArgs>(args: SelectSubset<T, CharacterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Characters and returns the data updated in the database.
     * @param {CharacterUpdateManyAndReturnArgs} args - Arguments to update many Characters.
     * @example
     * // Update many Characters
     * const character = await prisma.character.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Characters and only return the `id`
     * const characterWithIdOnly = await prisma.character.updateManyAndReturn({
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
    updateManyAndReturn<T extends CharacterUpdateManyAndReturnArgs>(args: SelectSubset<T, CharacterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Character.
     * @param {CharacterUpsertArgs} args - Arguments to update or create a Character.
     * @example
     * // Update or create a Character
     * const character = await prisma.character.upsert({
     *   create: {
     *     // ... data to create a Character
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Character we want to update
     *   }
     * })
     */
    upsert<T extends CharacterUpsertArgs>(args: SelectSubset<T, CharacterUpsertArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Characters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterCountArgs} args - Arguments to filter Characters to count.
     * @example
     * // Count the number of Characters
     * const count = await prisma.character.count({
     *   where: {
     *     // ... the filter for the Characters we want to count
     *   }
     * })
    **/
    count<T extends CharacterCountArgs>(
      args?: Subset<T, CharacterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharacterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Character.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CharacterAggregateArgs>(args: Subset<T, CharacterAggregateArgs>): Prisma.PrismaPromise<GetCharacterAggregateType<T>>

    /**
     * Group by Character.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterGroupByArgs} args - Group by arguments.
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
      T extends CharacterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CharacterGroupByArgs['orderBy'] }
        : { orderBy?: CharacterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CharacterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharacterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Character model
   */
  readonly fields: CharacterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Character.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CharacterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sheet<T extends Character$sheetArgs<ExtArgs> = {}>(args?: Subset<T, Character$sheetArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    permissions<T extends Character$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Character$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tokens<T extends Character$tokensArgs<ExtArgs> = {}>(args?: Subset<T, Character$tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Character model
   */
  interface CharacterFieldRefs {
    readonly id: FieldRef<"Character", 'String'>
    readonly campaignId: FieldRef<"Character", 'String'>
    readonly ownerUserId: FieldRef<"Character", 'String'>
    readonly createdByUserId: FieldRef<"Character", 'String'>
    readonly name: FieldRef<"Character", 'String'>
    readonly type: FieldRef<"Character", 'CharacterType'>
    readonly visibility: FieldRef<"Character", 'CharacterVisibility'>
    readonly portraitImage: FieldRef<"Character", 'String'>
    readonly defaultTokenImage: FieldRef<"Character", 'String'>
    readonly system: FieldRef<"Character", 'String'>
    readonly createdAt: FieldRef<"Character", 'DateTime'>
    readonly updatedAt: FieldRef<"Character", 'DateTime'>
    readonly archivedAt: FieldRef<"Character", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Character findUnique
   */
  export type CharacterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Character to fetch.
     */
    where: CharacterWhereUniqueInput
  }

  /**
   * Character findUniqueOrThrow
   */
  export type CharacterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Character to fetch.
     */
    where: CharacterWhereUniqueInput
  }

  /**
   * Character findFirst
   */
  export type CharacterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Character to fetch.
     */
    where?: CharacterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Characters to fetch.
     */
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Characters.
     */
    cursor?: CharacterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Characters.
     */
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
  }

  /**
   * Character findFirstOrThrow
   */
  export type CharacterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Character to fetch.
     */
    where?: CharacterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Characters to fetch.
     */
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Characters.
     */
    cursor?: CharacterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Characters.
     */
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
  }

  /**
   * Character findMany
   */
  export type CharacterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Characters to fetch.
     */
    where?: CharacterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Characters to fetch.
     */
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Characters.
     */
    cursor?: CharacterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Characters.
     */
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
  }

  /**
   * Character create
   */
  export type CharacterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * The data needed to create a Character.
     */
    data: XOR<CharacterCreateInput, CharacterUncheckedCreateInput>
  }

  /**
   * Character createMany
   */
  export type CharacterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Characters.
     */
    data: CharacterCreateManyInput | CharacterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Character createManyAndReturn
   */
  export type CharacterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * The data used to create many Characters.
     */
    data: CharacterCreateManyInput | CharacterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Character update
   */
  export type CharacterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * The data needed to update a Character.
     */
    data: XOR<CharacterUpdateInput, CharacterUncheckedUpdateInput>
    /**
     * Choose, which Character to update.
     */
    where: CharacterWhereUniqueInput
  }

  /**
   * Character updateMany
   */
  export type CharacterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Characters.
     */
    data: XOR<CharacterUpdateManyMutationInput, CharacterUncheckedUpdateManyInput>
    /**
     * Filter which Characters to update
     */
    where?: CharacterWhereInput
    /**
     * Limit how many Characters to update.
     */
    limit?: number
  }

  /**
   * Character updateManyAndReturn
   */
  export type CharacterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * The data used to update Characters.
     */
    data: XOR<CharacterUpdateManyMutationInput, CharacterUncheckedUpdateManyInput>
    /**
     * Filter which Characters to update
     */
    where?: CharacterWhereInput
    /**
     * Limit how many Characters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Character upsert
   */
  export type CharacterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * The filter to search for the Character to update in case it exists.
     */
    where: CharacterWhereUniqueInput
    /**
     * In case the Character found by the `where` argument doesn't exist, create a new Character with this data.
     */
    create: XOR<CharacterCreateInput, CharacterUncheckedCreateInput>
    /**
     * In case the Character was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CharacterUpdateInput, CharacterUncheckedUpdateInput>
  }

  /**
   * Character delete
   */
  export type CharacterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter which Character to delete.
     */
    where: CharacterWhereUniqueInput
  }

  /**
   * Character deleteMany
   */
  export type CharacterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Characters to delete
     */
    where?: CharacterWhereInput
    /**
     * Limit how many Characters to delete.
     */
    limit?: number
  }

  /**
   * Character.sheet
   */
  export type Character$sheetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    where?: CharacterSheetWhereInput
  }

  /**
   * Character.permissions
   */
  export type Character$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    where?: CharacterPermissionWhereInput
    orderBy?: CharacterPermissionOrderByWithRelationInput | CharacterPermissionOrderByWithRelationInput[]
    cursor?: CharacterPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharacterPermissionScalarFieldEnum | CharacterPermissionScalarFieldEnum[]
  }

  /**
   * Character.tokens
   */
  export type Character$tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapToken
     */
    select?: MapTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapToken
     */
    omit?: MapTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapTokenInclude<ExtArgs> | null
    where?: MapTokenWhereInput
    orderBy?: MapTokenOrderByWithRelationInput | MapTokenOrderByWithRelationInput[]
    cursor?: MapTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MapTokenScalarFieldEnum | MapTokenScalarFieldEnum[]
  }

  /**
   * Character without action
   */
  export type CharacterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
  }


  /**
   * Model CharacterSheet
   */

  export type AggregateCharacterSheet = {
    _count: CharacterSheetCountAggregateOutputType | null
    _avg: CharacterSheetAvgAggregateOutputType | null
    _sum: CharacterSheetSumAggregateOutputType | null
    _min: CharacterSheetMinAggregateOutputType | null
    _max: CharacterSheetMaxAggregateOutputType | null
  }

  export type CharacterSheetAvgAggregateOutputType = {
    schemaVersion: number | null
    version: number | null
  }

  export type CharacterSheetSumAggregateOutputType = {
    schemaVersion: number | null
    version: number | null
  }

  export type CharacterSheetMinAggregateOutputType = {
    id: string | null
    characterId: string | null
    system: string | null
    schemaVersion: number | null
    version: number | null
    lastEditedByUserId: string | null
    updatedAt: Date | null
  }

  export type CharacterSheetMaxAggregateOutputType = {
    id: string | null
    characterId: string | null
    system: string | null
    schemaVersion: number | null
    version: number | null
    lastEditedByUserId: string | null
    updatedAt: Date | null
  }

  export type CharacterSheetCountAggregateOutputType = {
    id: number
    characterId: number
    system: number
    schemaVersion: number
    dataJson: number
    version: number
    lastEditedByUserId: number
    updatedAt: number
    _all: number
  }


  export type CharacterSheetAvgAggregateInputType = {
    schemaVersion?: true
    version?: true
  }

  export type CharacterSheetSumAggregateInputType = {
    schemaVersion?: true
    version?: true
  }

  export type CharacterSheetMinAggregateInputType = {
    id?: true
    characterId?: true
    system?: true
    schemaVersion?: true
    version?: true
    lastEditedByUserId?: true
    updatedAt?: true
  }

  export type CharacterSheetMaxAggregateInputType = {
    id?: true
    characterId?: true
    system?: true
    schemaVersion?: true
    version?: true
    lastEditedByUserId?: true
    updatedAt?: true
  }

  export type CharacterSheetCountAggregateInputType = {
    id?: true
    characterId?: true
    system?: true
    schemaVersion?: true
    dataJson?: true
    version?: true
    lastEditedByUserId?: true
    updatedAt?: true
    _all?: true
  }

  export type CharacterSheetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CharacterSheet to aggregate.
     */
    where?: CharacterSheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharacterSheets to fetch.
     */
    orderBy?: CharacterSheetOrderByWithRelationInput | CharacterSheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CharacterSheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharacterSheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharacterSheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CharacterSheets
    **/
    _count?: true | CharacterSheetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CharacterSheetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CharacterSheetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharacterSheetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharacterSheetMaxAggregateInputType
  }

  export type GetCharacterSheetAggregateType<T extends CharacterSheetAggregateArgs> = {
        [P in keyof T & keyof AggregateCharacterSheet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharacterSheet[P]>
      : GetScalarType<T[P], AggregateCharacterSheet[P]>
  }




  export type CharacterSheetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharacterSheetWhereInput
    orderBy?: CharacterSheetOrderByWithAggregationInput | CharacterSheetOrderByWithAggregationInput[]
    by: CharacterSheetScalarFieldEnum[] | CharacterSheetScalarFieldEnum
    having?: CharacterSheetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharacterSheetCountAggregateInputType | true
    _avg?: CharacterSheetAvgAggregateInputType
    _sum?: CharacterSheetSumAggregateInputType
    _min?: CharacterSheetMinAggregateInputType
    _max?: CharacterSheetMaxAggregateInputType
  }

  export type CharacterSheetGroupByOutputType = {
    id: string
    characterId: string
    system: string
    schemaVersion: number
    dataJson: JsonValue
    version: number
    lastEditedByUserId: string | null
    updatedAt: Date
    _count: CharacterSheetCountAggregateOutputType | null
    _avg: CharacterSheetAvgAggregateOutputType | null
    _sum: CharacterSheetSumAggregateOutputType | null
    _min: CharacterSheetMinAggregateOutputType | null
    _max: CharacterSheetMaxAggregateOutputType | null
  }

  type GetCharacterSheetGroupByPayload<T extends CharacterSheetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharacterSheetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharacterSheetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharacterSheetGroupByOutputType[P]>
            : GetScalarType<T[P], CharacterSheetGroupByOutputType[P]>
        }
      >
    >


  export type CharacterSheetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    characterId?: boolean
    system?: boolean
    schemaVersion?: boolean
    dataJson?: boolean
    version?: boolean
    lastEditedByUserId?: boolean
    updatedAt?: boolean
    character?: boolean | CharacterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["characterSheet"]>

  export type CharacterSheetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    characterId?: boolean
    system?: boolean
    schemaVersion?: boolean
    dataJson?: boolean
    version?: boolean
    lastEditedByUserId?: boolean
    updatedAt?: boolean
    character?: boolean | CharacterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["characterSheet"]>

  export type CharacterSheetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    characterId?: boolean
    system?: boolean
    schemaVersion?: boolean
    dataJson?: boolean
    version?: boolean
    lastEditedByUserId?: boolean
    updatedAt?: boolean
    character?: boolean | CharacterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["characterSheet"]>

  export type CharacterSheetSelectScalar = {
    id?: boolean
    characterId?: boolean
    system?: boolean
    schemaVersion?: boolean
    dataJson?: boolean
    version?: boolean
    lastEditedByUserId?: boolean
    updatedAt?: boolean
  }

  export type CharacterSheetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "characterId" | "system" | "schemaVersion" | "dataJson" | "version" | "lastEditedByUserId" | "updatedAt", ExtArgs["result"]["characterSheet"]>
  export type CharacterSheetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | CharacterDefaultArgs<ExtArgs>
  }
  export type CharacterSheetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | CharacterDefaultArgs<ExtArgs>
  }
  export type CharacterSheetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | CharacterDefaultArgs<ExtArgs>
  }

  export type $CharacterSheetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CharacterSheet"
    objects: {
      character: Prisma.$CharacterPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      characterId: string
      system: string
      schemaVersion: number
      dataJson: Prisma.JsonValue
      version: number
      lastEditedByUserId: string | null
      updatedAt: Date
    }, ExtArgs["result"]["characterSheet"]>
    composites: {}
  }

  type CharacterSheetGetPayload<S extends boolean | null | undefined | CharacterSheetDefaultArgs> = $Result.GetResult<Prisma.$CharacterSheetPayload, S>

  type CharacterSheetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CharacterSheetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CharacterSheetCountAggregateInputType | true
    }

  export interface CharacterSheetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CharacterSheet'], meta: { name: 'CharacterSheet' } }
    /**
     * Find zero or one CharacterSheet that matches the filter.
     * @param {CharacterSheetFindUniqueArgs} args - Arguments to find a CharacterSheet
     * @example
     * // Get one CharacterSheet
     * const characterSheet = await prisma.characterSheet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharacterSheetFindUniqueArgs>(args: SelectSubset<T, CharacterSheetFindUniqueArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CharacterSheet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharacterSheetFindUniqueOrThrowArgs} args - Arguments to find a CharacterSheet
     * @example
     * // Get one CharacterSheet
     * const characterSheet = await prisma.characterSheet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharacterSheetFindUniqueOrThrowArgs>(args: SelectSubset<T, CharacterSheetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CharacterSheet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterSheetFindFirstArgs} args - Arguments to find a CharacterSheet
     * @example
     * // Get one CharacterSheet
     * const characterSheet = await prisma.characterSheet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharacterSheetFindFirstArgs>(args?: SelectSubset<T, CharacterSheetFindFirstArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CharacterSheet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterSheetFindFirstOrThrowArgs} args - Arguments to find a CharacterSheet
     * @example
     * // Get one CharacterSheet
     * const characterSheet = await prisma.characterSheet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharacterSheetFindFirstOrThrowArgs>(args?: SelectSubset<T, CharacterSheetFindFirstOrThrowArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CharacterSheets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterSheetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CharacterSheets
     * const characterSheets = await prisma.characterSheet.findMany()
     * 
     * // Get first 10 CharacterSheets
     * const characterSheets = await prisma.characterSheet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const characterSheetWithIdOnly = await prisma.characterSheet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CharacterSheetFindManyArgs>(args?: SelectSubset<T, CharacterSheetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CharacterSheet.
     * @param {CharacterSheetCreateArgs} args - Arguments to create a CharacterSheet.
     * @example
     * // Create one CharacterSheet
     * const CharacterSheet = await prisma.characterSheet.create({
     *   data: {
     *     // ... data to create a CharacterSheet
     *   }
     * })
     * 
     */
    create<T extends CharacterSheetCreateArgs>(args: SelectSubset<T, CharacterSheetCreateArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CharacterSheets.
     * @param {CharacterSheetCreateManyArgs} args - Arguments to create many CharacterSheets.
     * @example
     * // Create many CharacterSheets
     * const characterSheet = await prisma.characterSheet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CharacterSheetCreateManyArgs>(args?: SelectSubset<T, CharacterSheetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CharacterSheets and returns the data saved in the database.
     * @param {CharacterSheetCreateManyAndReturnArgs} args - Arguments to create many CharacterSheets.
     * @example
     * // Create many CharacterSheets
     * const characterSheet = await prisma.characterSheet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CharacterSheets and only return the `id`
     * const characterSheetWithIdOnly = await prisma.characterSheet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CharacterSheetCreateManyAndReturnArgs>(args?: SelectSubset<T, CharacterSheetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CharacterSheet.
     * @param {CharacterSheetDeleteArgs} args - Arguments to delete one CharacterSheet.
     * @example
     * // Delete one CharacterSheet
     * const CharacterSheet = await prisma.characterSheet.delete({
     *   where: {
     *     // ... filter to delete one CharacterSheet
     *   }
     * })
     * 
     */
    delete<T extends CharacterSheetDeleteArgs>(args: SelectSubset<T, CharacterSheetDeleteArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CharacterSheet.
     * @param {CharacterSheetUpdateArgs} args - Arguments to update one CharacterSheet.
     * @example
     * // Update one CharacterSheet
     * const characterSheet = await prisma.characterSheet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CharacterSheetUpdateArgs>(args: SelectSubset<T, CharacterSheetUpdateArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CharacterSheets.
     * @param {CharacterSheetDeleteManyArgs} args - Arguments to filter CharacterSheets to delete.
     * @example
     * // Delete a few CharacterSheets
     * const { count } = await prisma.characterSheet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CharacterSheetDeleteManyArgs>(args?: SelectSubset<T, CharacterSheetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharacterSheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterSheetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CharacterSheets
     * const characterSheet = await prisma.characterSheet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CharacterSheetUpdateManyArgs>(args: SelectSubset<T, CharacterSheetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharacterSheets and returns the data updated in the database.
     * @param {CharacterSheetUpdateManyAndReturnArgs} args - Arguments to update many CharacterSheets.
     * @example
     * // Update many CharacterSheets
     * const characterSheet = await prisma.characterSheet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CharacterSheets and only return the `id`
     * const characterSheetWithIdOnly = await prisma.characterSheet.updateManyAndReturn({
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
    updateManyAndReturn<T extends CharacterSheetUpdateManyAndReturnArgs>(args: SelectSubset<T, CharacterSheetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CharacterSheet.
     * @param {CharacterSheetUpsertArgs} args - Arguments to update or create a CharacterSheet.
     * @example
     * // Update or create a CharacterSheet
     * const characterSheet = await prisma.characterSheet.upsert({
     *   create: {
     *     // ... data to create a CharacterSheet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CharacterSheet we want to update
     *   }
     * })
     */
    upsert<T extends CharacterSheetUpsertArgs>(args: SelectSubset<T, CharacterSheetUpsertArgs<ExtArgs>>): Prisma__CharacterSheetClient<$Result.GetResult<Prisma.$CharacterSheetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CharacterSheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterSheetCountArgs} args - Arguments to filter CharacterSheets to count.
     * @example
     * // Count the number of CharacterSheets
     * const count = await prisma.characterSheet.count({
     *   where: {
     *     // ... the filter for the CharacterSheets we want to count
     *   }
     * })
    **/
    count<T extends CharacterSheetCountArgs>(
      args?: Subset<T, CharacterSheetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharacterSheetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CharacterSheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterSheetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CharacterSheetAggregateArgs>(args: Subset<T, CharacterSheetAggregateArgs>): Prisma.PrismaPromise<GetCharacterSheetAggregateType<T>>

    /**
     * Group by CharacterSheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterSheetGroupByArgs} args - Group by arguments.
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
      T extends CharacterSheetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CharacterSheetGroupByArgs['orderBy'] }
        : { orderBy?: CharacterSheetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CharacterSheetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharacterSheetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CharacterSheet model
   */
  readonly fields: CharacterSheetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CharacterSheet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CharacterSheetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    character<T extends CharacterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CharacterDefaultArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CharacterSheet model
   */
  interface CharacterSheetFieldRefs {
    readonly id: FieldRef<"CharacterSheet", 'String'>
    readonly characterId: FieldRef<"CharacterSheet", 'String'>
    readonly system: FieldRef<"CharacterSheet", 'String'>
    readonly schemaVersion: FieldRef<"CharacterSheet", 'Int'>
    readonly dataJson: FieldRef<"CharacterSheet", 'Json'>
    readonly version: FieldRef<"CharacterSheet", 'Int'>
    readonly lastEditedByUserId: FieldRef<"CharacterSheet", 'String'>
    readonly updatedAt: FieldRef<"CharacterSheet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CharacterSheet findUnique
   */
  export type CharacterSheetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * Filter, which CharacterSheet to fetch.
     */
    where: CharacterSheetWhereUniqueInput
  }

  /**
   * CharacterSheet findUniqueOrThrow
   */
  export type CharacterSheetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * Filter, which CharacterSheet to fetch.
     */
    where: CharacterSheetWhereUniqueInput
  }

  /**
   * CharacterSheet findFirst
   */
  export type CharacterSheetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * Filter, which CharacterSheet to fetch.
     */
    where?: CharacterSheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharacterSheets to fetch.
     */
    orderBy?: CharacterSheetOrderByWithRelationInput | CharacterSheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CharacterSheets.
     */
    cursor?: CharacterSheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharacterSheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharacterSheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharacterSheets.
     */
    distinct?: CharacterSheetScalarFieldEnum | CharacterSheetScalarFieldEnum[]
  }

  /**
   * CharacterSheet findFirstOrThrow
   */
  export type CharacterSheetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * Filter, which CharacterSheet to fetch.
     */
    where?: CharacterSheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharacterSheets to fetch.
     */
    orderBy?: CharacterSheetOrderByWithRelationInput | CharacterSheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CharacterSheets.
     */
    cursor?: CharacterSheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharacterSheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharacterSheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharacterSheets.
     */
    distinct?: CharacterSheetScalarFieldEnum | CharacterSheetScalarFieldEnum[]
  }

  /**
   * CharacterSheet findMany
   */
  export type CharacterSheetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * Filter, which CharacterSheets to fetch.
     */
    where?: CharacterSheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharacterSheets to fetch.
     */
    orderBy?: CharacterSheetOrderByWithRelationInput | CharacterSheetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CharacterSheets.
     */
    cursor?: CharacterSheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharacterSheets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharacterSheets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharacterSheets.
     */
    distinct?: CharacterSheetScalarFieldEnum | CharacterSheetScalarFieldEnum[]
  }

  /**
   * CharacterSheet create
   */
  export type CharacterSheetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * The data needed to create a CharacterSheet.
     */
    data: XOR<CharacterSheetCreateInput, CharacterSheetUncheckedCreateInput>
  }

  /**
   * CharacterSheet createMany
   */
  export type CharacterSheetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CharacterSheets.
     */
    data: CharacterSheetCreateManyInput | CharacterSheetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CharacterSheet createManyAndReturn
   */
  export type CharacterSheetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * The data used to create many CharacterSheets.
     */
    data: CharacterSheetCreateManyInput | CharacterSheetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CharacterSheet update
   */
  export type CharacterSheetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * The data needed to update a CharacterSheet.
     */
    data: XOR<CharacterSheetUpdateInput, CharacterSheetUncheckedUpdateInput>
    /**
     * Choose, which CharacterSheet to update.
     */
    where: CharacterSheetWhereUniqueInput
  }

  /**
   * CharacterSheet updateMany
   */
  export type CharacterSheetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CharacterSheets.
     */
    data: XOR<CharacterSheetUpdateManyMutationInput, CharacterSheetUncheckedUpdateManyInput>
    /**
     * Filter which CharacterSheets to update
     */
    where?: CharacterSheetWhereInput
    /**
     * Limit how many CharacterSheets to update.
     */
    limit?: number
  }

  /**
   * CharacterSheet updateManyAndReturn
   */
  export type CharacterSheetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * The data used to update CharacterSheets.
     */
    data: XOR<CharacterSheetUpdateManyMutationInput, CharacterSheetUncheckedUpdateManyInput>
    /**
     * Filter which CharacterSheets to update
     */
    where?: CharacterSheetWhereInput
    /**
     * Limit how many CharacterSheets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CharacterSheet upsert
   */
  export type CharacterSheetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * The filter to search for the CharacterSheet to update in case it exists.
     */
    where: CharacterSheetWhereUniqueInput
    /**
     * In case the CharacterSheet found by the `where` argument doesn't exist, create a new CharacterSheet with this data.
     */
    create: XOR<CharacterSheetCreateInput, CharacterSheetUncheckedCreateInput>
    /**
     * In case the CharacterSheet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CharacterSheetUpdateInput, CharacterSheetUncheckedUpdateInput>
  }

  /**
   * CharacterSheet delete
   */
  export type CharacterSheetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
    /**
     * Filter which CharacterSheet to delete.
     */
    where: CharacterSheetWhereUniqueInput
  }

  /**
   * CharacterSheet deleteMany
   */
  export type CharacterSheetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CharacterSheets to delete
     */
    where?: CharacterSheetWhereInput
    /**
     * Limit how many CharacterSheets to delete.
     */
    limit?: number
  }

  /**
   * CharacterSheet without action
   */
  export type CharacterSheetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterSheet
     */
    select?: CharacterSheetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterSheet
     */
    omit?: CharacterSheetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterSheetInclude<ExtArgs> | null
  }


  /**
   * Model CharacterPermission
   */

  export type AggregateCharacterPermission = {
    _count: CharacterPermissionCountAggregateOutputType | null
    _min: CharacterPermissionMinAggregateOutputType | null
    _max: CharacterPermissionMaxAggregateOutputType | null
  }

  export type CharacterPermissionMinAggregateOutputType = {
    id: string | null
    characterId: string | null
    userId: string | null
    canView: boolean | null
    canEdit: boolean | null
    canControl: boolean | null
  }

  export type CharacterPermissionMaxAggregateOutputType = {
    id: string | null
    characterId: string | null
    userId: string | null
    canView: boolean | null
    canEdit: boolean | null
    canControl: boolean | null
  }

  export type CharacterPermissionCountAggregateOutputType = {
    id: number
    characterId: number
    userId: number
    canView: number
    canEdit: number
    canControl: number
    _all: number
  }


  export type CharacterPermissionMinAggregateInputType = {
    id?: true
    characterId?: true
    userId?: true
    canView?: true
    canEdit?: true
    canControl?: true
  }

  export type CharacterPermissionMaxAggregateInputType = {
    id?: true
    characterId?: true
    userId?: true
    canView?: true
    canEdit?: true
    canControl?: true
  }

  export type CharacterPermissionCountAggregateInputType = {
    id?: true
    characterId?: true
    userId?: true
    canView?: true
    canEdit?: true
    canControl?: true
    _all?: true
  }

  export type CharacterPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CharacterPermission to aggregate.
     */
    where?: CharacterPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharacterPermissions to fetch.
     */
    orderBy?: CharacterPermissionOrderByWithRelationInput | CharacterPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CharacterPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharacterPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharacterPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CharacterPermissions
    **/
    _count?: true | CharacterPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharacterPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharacterPermissionMaxAggregateInputType
  }

  export type GetCharacterPermissionAggregateType<T extends CharacterPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateCharacterPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharacterPermission[P]>
      : GetScalarType<T[P], AggregateCharacterPermission[P]>
  }




  export type CharacterPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharacterPermissionWhereInput
    orderBy?: CharacterPermissionOrderByWithAggregationInput | CharacterPermissionOrderByWithAggregationInput[]
    by: CharacterPermissionScalarFieldEnum[] | CharacterPermissionScalarFieldEnum
    having?: CharacterPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharacterPermissionCountAggregateInputType | true
    _min?: CharacterPermissionMinAggregateInputType
    _max?: CharacterPermissionMaxAggregateInputType
  }

  export type CharacterPermissionGroupByOutputType = {
    id: string
    characterId: string
    userId: string
    canView: boolean
    canEdit: boolean
    canControl: boolean
    _count: CharacterPermissionCountAggregateOutputType | null
    _min: CharacterPermissionMinAggregateOutputType | null
    _max: CharacterPermissionMaxAggregateOutputType | null
  }

  type GetCharacterPermissionGroupByPayload<T extends CharacterPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharacterPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharacterPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharacterPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], CharacterPermissionGroupByOutputType[P]>
        }
      >
    >


  export type CharacterPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    characterId?: boolean
    userId?: boolean
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
    character?: boolean | CharacterDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["characterPermission"]>

  export type CharacterPermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    characterId?: boolean
    userId?: boolean
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
    character?: boolean | CharacterDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["characterPermission"]>

  export type CharacterPermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    characterId?: boolean
    userId?: boolean
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
    character?: boolean | CharacterDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["characterPermission"]>

  export type CharacterPermissionSelectScalar = {
    id?: boolean
    characterId?: boolean
    userId?: boolean
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
  }

  export type CharacterPermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "characterId" | "userId" | "canView" | "canEdit" | "canControl", ExtArgs["result"]["characterPermission"]>
  export type CharacterPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | CharacterDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CharacterPermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | CharacterDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CharacterPermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | CharacterDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CharacterPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CharacterPermission"
    objects: {
      character: Prisma.$CharacterPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      characterId: string
      userId: string
      canView: boolean
      canEdit: boolean
      canControl: boolean
    }, ExtArgs["result"]["characterPermission"]>
    composites: {}
  }

  type CharacterPermissionGetPayload<S extends boolean | null | undefined | CharacterPermissionDefaultArgs> = $Result.GetResult<Prisma.$CharacterPermissionPayload, S>

  type CharacterPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CharacterPermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CharacterPermissionCountAggregateInputType | true
    }

  export interface CharacterPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CharacterPermission'], meta: { name: 'CharacterPermission' } }
    /**
     * Find zero or one CharacterPermission that matches the filter.
     * @param {CharacterPermissionFindUniqueArgs} args - Arguments to find a CharacterPermission
     * @example
     * // Get one CharacterPermission
     * const characterPermission = await prisma.characterPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharacterPermissionFindUniqueArgs>(args: SelectSubset<T, CharacterPermissionFindUniqueArgs<ExtArgs>>): Prisma__CharacterPermissionClient<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CharacterPermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharacterPermissionFindUniqueOrThrowArgs} args - Arguments to find a CharacterPermission
     * @example
     * // Get one CharacterPermission
     * const characterPermission = await prisma.characterPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharacterPermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, CharacterPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CharacterPermissionClient<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CharacterPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterPermissionFindFirstArgs} args - Arguments to find a CharacterPermission
     * @example
     * // Get one CharacterPermission
     * const characterPermission = await prisma.characterPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharacterPermissionFindFirstArgs>(args?: SelectSubset<T, CharacterPermissionFindFirstArgs<ExtArgs>>): Prisma__CharacterPermissionClient<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CharacterPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterPermissionFindFirstOrThrowArgs} args - Arguments to find a CharacterPermission
     * @example
     * // Get one CharacterPermission
     * const characterPermission = await prisma.characterPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharacterPermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, CharacterPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CharacterPermissionClient<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CharacterPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CharacterPermissions
     * const characterPermissions = await prisma.characterPermission.findMany()
     * 
     * // Get first 10 CharacterPermissions
     * const characterPermissions = await prisma.characterPermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const characterPermissionWithIdOnly = await prisma.characterPermission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CharacterPermissionFindManyArgs>(args?: SelectSubset<T, CharacterPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CharacterPermission.
     * @param {CharacterPermissionCreateArgs} args - Arguments to create a CharacterPermission.
     * @example
     * // Create one CharacterPermission
     * const CharacterPermission = await prisma.characterPermission.create({
     *   data: {
     *     // ... data to create a CharacterPermission
     *   }
     * })
     * 
     */
    create<T extends CharacterPermissionCreateArgs>(args: SelectSubset<T, CharacterPermissionCreateArgs<ExtArgs>>): Prisma__CharacterPermissionClient<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CharacterPermissions.
     * @param {CharacterPermissionCreateManyArgs} args - Arguments to create many CharacterPermissions.
     * @example
     * // Create many CharacterPermissions
     * const characterPermission = await prisma.characterPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CharacterPermissionCreateManyArgs>(args?: SelectSubset<T, CharacterPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CharacterPermissions and returns the data saved in the database.
     * @param {CharacterPermissionCreateManyAndReturnArgs} args - Arguments to create many CharacterPermissions.
     * @example
     * // Create many CharacterPermissions
     * const characterPermission = await prisma.characterPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CharacterPermissions and only return the `id`
     * const characterPermissionWithIdOnly = await prisma.characterPermission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CharacterPermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, CharacterPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CharacterPermission.
     * @param {CharacterPermissionDeleteArgs} args - Arguments to delete one CharacterPermission.
     * @example
     * // Delete one CharacterPermission
     * const CharacterPermission = await prisma.characterPermission.delete({
     *   where: {
     *     // ... filter to delete one CharacterPermission
     *   }
     * })
     * 
     */
    delete<T extends CharacterPermissionDeleteArgs>(args: SelectSubset<T, CharacterPermissionDeleteArgs<ExtArgs>>): Prisma__CharacterPermissionClient<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CharacterPermission.
     * @param {CharacterPermissionUpdateArgs} args - Arguments to update one CharacterPermission.
     * @example
     * // Update one CharacterPermission
     * const characterPermission = await prisma.characterPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CharacterPermissionUpdateArgs>(args: SelectSubset<T, CharacterPermissionUpdateArgs<ExtArgs>>): Prisma__CharacterPermissionClient<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CharacterPermissions.
     * @param {CharacterPermissionDeleteManyArgs} args - Arguments to filter CharacterPermissions to delete.
     * @example
     * // Delete a few CharacterPermissions
     * const { count } = await prisma.characterPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CharacterPermissionDeleteManyArgs>(args?: SelectSubset<T, CharacterPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharacterPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CharacterPermissions
     * const characterPermission = await prisma.characterPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CharacterPermissionUpdateManyArgs>(args: SelectSubset<T, CharacterPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharacterPermissions and returns the data updated in the database.
     * @param {CharacterPermissionUpdateManyAndReturnArgs} args - Arguments to update many CharacterPermissions.
     * @example
     * // Update many CharacterPermissions
     * const characterPermission = await prisma.characterPermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CharacterPermissions and only return the `id`
     * const characterPermissionWithIdOnly = await prisma.characterPermission.updateManyAndReturn({
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
    updateManyAndReturn<T extends CharacterPermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, CharacterPermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CharacterPermission.
     * @param {CharacterPermissionUpsertArgs} args - Arguments to update or create a CharacterPermission.
     * @example
     * // Update or create a CharacterPermission
     * const characterPermission = await prisma.characterPermission.upsert({
     *   create: {
     *     // ... data to create a CharacterPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CharacterPermission we want to update
     *   }
     * })
     */
    upsert<T extends CharacterPermissionUpsertArgs>(args: SelectSubset<T, CharacterPermissionUpsertArgs<ExtArgs>>): Prisma__CharacterPermissionClient<$Result.GetResult<Prisma.$CharacterPermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CharacterPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterPermissionCountArgs} args - Arguments to filter CharacterPermissions to count.
     * @example
     * // Count the number of CharacterPermissions
     * const count = await prisma.characterPermission.count({
     *   where: {
     *     // ... the filter for the CharacterPermissions we want to count
     *   }
     * })
    **/
    count<T extends CharacterPermissionCountArgs>(
      args?: Subset<T, CharacterPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharacterPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CharacterPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CharacterPermissionAggregateArgs>(args: Subset<T, CharacterPermissionAggregateArgs>): Prisma.PrismaPromise<GetCharacterPermissionAggregateType<T>>

    /**
     * Group by CharacterPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterPermissionGroupByArgs} args - Group by arguments.
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
      T extends CharacterPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CharacterPermissionGroupByArgs['orderBy'] }
        : { orderBy?: CharacterPermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CharacterPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharacterPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CharacterPermission model
   */
  readonly fields: CharacterPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CharacterPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CharacterPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    character<T extends CharacterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CharacterDefaultArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CharacterPermission model
   */
  interface CharacterPermissionFieldRefs {
    readonly id: FieldRef<"CharacterPermission", 'String'>
    readonly characterId: FieldRef<"CharacterPermission", 'String'>
    readonly userId: FieldRef<"CharacterPermission", 'String'>
    readonly canView: FieldRef<"CharacterPermission", 'Boolean'>
    readonly canEdit: FieldRef<"CharacterPermission", 'Boolean'>
    readonly canControl: FieldRef<"CharacterPermission", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CharacterPermission findUnique
   */
  export type CharacterPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * Filter, which CharacterPermission to fetch.
     */
    where: CharacterPermissionWhereUniqueInput
  }

  /**
   * CharacterPermission findUniqueOrThrow
   */
  export type CharacterPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * Filter, which CharacterPermission to fetch.
     */
    where: CharacterPermissionWhereUniqueInput
  }

  /**
   * CharacterPermission findFirst
   */
  export type CharacterPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * Filter, which CharacterPermission to fetch.
     */
    where?: CharacterPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharacterPermissions to fetch.
     */
    orderBy?: CharacterPermissionOrderByWithRelationInput | CharacterPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CharacterPermissions.
     */
    cursor?: CharacterPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharacterPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharacterPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharacterPermissions.
     */
    distinct?: CharacterPermissionScalarFieldEnum | CharacterPermissionScalarFieldEnum[]
  }

  /**
   * CharacterPermission findFirstOrThrow
   */
  export type CharacterPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * Filter, which CharacterPermission to fetch.
     */
    where?: CharacterPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharacterPermissions to fetch.
     */
    orderBy?: CharacterPermissionOrderByWithRelationInput | CharacterPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CharacterPermissions.
     */
    cursor?: CharacterPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharacterPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharacterPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharacterPermissions.
     */
    distinct?: CharacterPermissionScalarFieldEnum | CharacterPermissionScalarFieldEnum[]
  }

  /**
   * CharacterPermission findMany
   */
  export type CharacterPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * Filter, which CharacterPermissions to fetch.
     */
    where?: CharacterPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharacterPermissions to fetch.
     */
    orderBy?: CharacterPermissionOrderByWithRelationInput | CharacterPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CharacterPermissions.
     */
    cursor?: CharacterPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharacterPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharacterPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharacterPermissions.
     */
    distinct?: CharacterPermissionScalarFieldEnum | CharacterPermissionScalarFieldEnum[]
  }

  /**
   * CharacterPermission create
   */
  export type CharacterPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a CharacterPermission.
     */
    data: XOR<CharacterPermissionCreateInput, CharacterPermissionUncheckedCreateInput>
  }

  /**
   * CharacterPermission createMany
   */
  export type CharacterPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CharacterPermissions.
     */
    data: CharacterPermissionCreateManyInput | CharacterPermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CharacterPermission createManyAndReturn
   */
  export type CharacterPermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * The data used to create many CharacterPermissions.
     */
    data: CharacterPermissionCreateManyInput | CharacterPermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CharacterPermission update
   */
  export type CharacterPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a CharacterPermission.
     */
    data: XOR<CharacterPermissionUpdateInput, CharacterPermissionUncheckedUpdateInput>
    /**
     * Choose, which CharacterPermission to update.
     */
    where: CharacterPermissionWhereUniqueInput
  }

  /**
   * CharacterPermission updateMany
   */
  export type CharacterPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CharacterPermissions.
     */
    data: XOR<CharacterPermissionUpdateManyMutationInput, CharacterPermissionUncheckedUpdateManyInput>
    /**
     * Filter which CharacterPermissions to update
     */
    where?: CharacterPermissionWhereInput
    /**
     * Limit how many CharacterPermissions to update.
     */
    limit?: number
  }

  /**
   * CharacterPermission updateManyAndReturn
   */
  export type CharacterPermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * The data used to update CharacterPermissions.
     */
    data: XOR<CharacterPermissionUpdateManyMutationInput, CharacterPermissionUncheckedUpdateManyInput>
    /**
     * Filter which CharacterPermissions to update
     */
    where?: CharacterPermissionWhereInput
    /**
     * Limit how many CharacterPermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CharacterPermission upsert
   */
  export type CharacterPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the CharacterPermission to update in case it exists.
     */
    where: CharacterPermissionWhereUniqueInput
    /**
     * In case the CharacterPermission found by the `where` argument doesn't exist, create a new CharacterPermission with this data.
     */
    create: XOR<CharacterPermissionCreateInput, CharacterPermissionUncheckedCreateInput>
    /**
     * In case the CharacterPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CharacterPermissionUpdateInput, CharacterPermissionUncheckedUpdateInput>
  }

  /**
   * CharacterPermission delete
   */
  export type CharacterPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
    /**
     * Filter which CharacterPermission to delete.
     */
    where: CharacterPermissionWhereUniqueInput
  }

  /**
   * CharacterPermission deleteMany
   */
  export type CharacterPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CharacterPermissions to delete
     */
    where?: CharacterPermissionWhereInput
    /**
     * Limit how many CharacterPermissions to delete.
     */
    limit?: number
  }

  /**
   * CharacterPermission without action
   */
  export type CharacterPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterPermission
     */
    select?: CharacterPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharacterPermission
     */
    omit?: CharacterPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterPermissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    refreshTokenHash: 'refreshTokenHash',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type UserSessionScalarFieldEnum = (typeof UserSessionScalarFieldEnum)[keyof typeof UserSessionScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    ownerUserId: 'ownerUserId',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    archivedAt: 'archivedAt'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const CampaignMemberScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    userId: 'userId',
    role: 'role',
    displayName: 'displayName',
    joinedAt: 'joinedAt',
    lastSeenAt: 'lastSeenAt'
  };

  export type CampaignMemberScalarFieldEnum = (typeof CampaignMemberScalarFieldEnum)[keyof typeof CampaignMemberScalarFieldEnum]


  export const CampaignInviteScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    code: 'code',
    roleOnJoin: 'roleOnJoin',
    createdByUserId: 'createdByUserId',
    maxUses: 'maxUses',
    usesCount: 'usesCount',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type CampaignInviteScalarFieldEnum = (typeof CampaignInviteScalarFieldEnum)[keyof typeof CampaignInviteScalarFieldEnum]


  export const CampaignSessionScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    activeMapId: 'activeMapId',
    status: 'status',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    createdByUserId: 'createdByUserId'
  };

  export type CampaignSessionScalarFieldEnum = (typeof CampaignSessionScalarFieldEnum)[keyof typeof CampaignSessionScalarFieldEnum]


  export const MapScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    name: 'name',
    width: 'width',
    height: 'height',
    cellSize: 'cellSize',
    gridType: 'gridType',
    backgroundImage: 'backgroundImage',
    backgroundFitMode: 'backgroundFitMode',
    backgroundOffsetX: 'backgroundOffsetX',
    backgroundOffsetY: 'backgroundOffsetY',
    backgroundScale: 'backgroundScale',
    gridOffsetX: 'gridOffsetX',
    gridOffsetY: 'gridOffsetY',
    gridColor: 'gridColor',
    gridOpacity: 'gridOpacity',
    fogEnabled: 'fogEnabled',
    fogMode: 'fogMode',
    fogOpacity: 'fogOpacity',
    fogPlayersSeeExplored: 'fogPlayersSeeExplored',
    layerConfigJson: 'layerConfigJson',
    sortOrder: 'sortOrder',
    isArchived: 'isArchived',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type MapScalarFieldEnum = (typeof MapScalarFieldEnum)[keyof typeof MapScalarFieldEnum]


  export const MapTokenScalarFieldEnum: {
    id: 'id',
    mapId: 'mapId',
    characterId: 'characterId',
    name: 'name',
    image: 'image',
    x: 'x',
    y: 'y',
    widthCells: 'widthCells',
    heightCells: 'heightCells',
    rotation: 'rotation',
    zIndex: 'zIndex',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
    layerKey: 'layerKey',
    visibility: 'visibility',
    isLocked: 'isLocked',
    isHidden: 'isHidden',
    elevation: 'elevation',
    standMode: 'standMode',
    barsJson: 'barsJson',
    statusJson: 'statusJson',
    visionJson: 'visionJson',
    lightJson: 'lightJson',
    disposition: 'disposition',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type MapTokenScalarFieldEnum = (typeof MapTokenScalarFieldEnum)[keyof typeof MapTokenScalarFieldEnum]


  export const CharacterScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    ownerUserId: 'ownerUserId',
    createdByUserId: 'createdByUserId',
    name: 'name',
    type: 'type',
    visibility: 'visibility',
    portraitImage: 'portraitImage',
    defaultTokenImage: 'defaultTokenImage',
    system: 'system',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    archivedAt: 'archivedAt'
  };

  export type CharacterScalarFieldEnum = (typeof CharacterScalarFieldEnum)[keyof typeof CharacterScalarFieldEnum]


  export const CharacterSheetScalarFieldEnum: {
    id: 'id',
    characterId: 'characterId',
    system: 'system',
    schemaVersion: 'schemaVersion',
    dataJson: 'dataJson',
    version: 'version',
    lastEditedByUserId: 'lastEditedByUserId',
    updatedAt: 'updatedAt'
  };

  export type CharacterSheetScalarFieldEnum = (typeof CharacterSheetScalarFieldEnum)[keyof typeof CharacterSheetScalarFieldEnum]


  export const CharacterPermissionScalarFieldEnum: {
    id: 'id',
    characterId: 'characterId',
    userId: 'userId',
    canView: 'canView',
    canEdit: 'canEdit',
    canControl: 'canControl'
  };

  export type CharacterPermissionScalarFieldEnum = (typeof CharacterPermissionScalarFieldEnum)[keyof typeof CharacterPermissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CampaignRole'
   */
  export type EnumCampaignRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignRole'>
    


  /**
   * Reference to a field of type 'CampaignRole[]'
   */
  export type ListEnumCampaignRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'CampaignSessionStatus'
   */
  export type EnumCampaignSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignSessionStatus'>
    


  /**
   * Reference to a field of type 'CampaignSessionStatus[]'
   */
  export type ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignSessionStatus[]'>
    


  /**
   * Reference to a field of type 'GridType'
   */
  export type EnumGridTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GridType'>
    


  /**
   * Reference to a field of type 'GridType[]'
   */
  export type ListEnumGridTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GridType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TokenVisibility'
   */
  export type EnumTokenVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenVisibility'>
    


  /**
   * Reference to a field of type 'TokenVisibility[]'
   */
  export type ListEnumTokenVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenVisibility[]'>
    


  /**
   * Reference to a field of type 'TokenDisposition'
   */
  export type EnumTokenDispositionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenDisposition'>
    


  /**
   * Reference to a field of type 'TokenDisposition[]'
   */
  export type ListEnumTokenDispositionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenDisposition[]'>
    


  /**
   * Reference to a field of type 'CharacterType'
   */
  export type EnumCharacterTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CharacterType'>
    


  /**
   * Reference to a field of type 'CharacterType[]'
   */
  export type ListEnumCharacterTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CharacterType[]'>
    


  /**
   * Reference to a field of type 'CharacterVisibility'
   */
  export type EnumCharacterVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CharacterVisibility'>
    


  /**
   * Reference to a field of type 'CharacterVisibility[]'
   */
  export type ListEnumCharacterVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CharacterVisibility[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: UserSessionListRelationFilter
    ownedCampaigns?: CampaignListRelationFilter
    campaignMembers?: CampaignMemberListRelationFilter
    createdCampaignInvites?: CampaignInviteListRelationFilter
    createdCampaignSessions?: CampaignSessionListRelationFilter
    characterPermissions?: CharacterPermissionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: UserSessionOrderByRelationAggregateInput
    ownedCampaigns?: CampaignOrderByRelationAggregateInput
    campaignMembers?: CampaignMemberOrderByRelationAggregateInput
    createdCampaignInvites?: CampaignInviteOrderByRelationAggregateInput
    createdCampaignSessions?: CampaignSessionOrderByRelationAggregateInput
    characterPermissions?: CharacterPermissionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: UserSessionListRelationFilter
    ownedCampaigns?: CampaignListRelationFilter
    campaignMembers?: CampaignMemberListRelationFilter
    createdCampaignInvites?: CampaignInviteListRelationFilter
    createdCampaignSessions?: CampaignSessionListRelationFilter
    characterPermissions?: CharacterPermissionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
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
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserSessionWhereInput = {
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    id?: StringFilter<"UserSession"> | string
    userId?: StringFilter<"UserSession"> | string
    refreshTokenHash?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshTokenHash?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    userId?: StringFilter<"UserSession"> | string
    refreshTokenHash?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshTokenHash?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserSessionCountOrderByAggregateInput
    _max?: UserSessionMaxOrderByAggregateInput
    _min?: UserSessionMinOrderByAggregateInput
  }

  export type UserSessionScalarWhereWithAggregatesInput = {
    AND?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    OR?: UserSessionScalarWhereWithAggregatesInput[]
    NOT?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSession"> | string
    userId?: StringWithAggregatesFilter<"UserSession"> | string
    refreshTokenHash?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    ownerUserId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    archivedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: CampaignMemberListRelationFilter
    invites?: CampaignInviteListRelationFilter
    sessions?: CampaignSessionListRelationFilter
    maps?: MapListRelationFilter
    characters?: CharacterListRelationFilter
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrderInput | SortOrder
    owner?: UserOrderByWithRelationInput
    members?: CampaignMemberOrderByRelationAggregateInput
    invites?: CampaignInviteOrderByRelationAggregateInput
    sessions?: CampaignSessionOrderByRelationAggregateInput
    maps?: MapOrderByRelationAggregateInput
    characters?: CharacterOrderByRelationAggregateInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    ownerUserId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    archivedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: CampaignMemberListRelationFilter
    invites?: CampaignInviteListRelationFilter
    sessions?: CampaignSessionListRelationFilter
    maps?: MapListRelationFilter
    characters?: CharacterListRelationFilter
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrderInput | SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    ownerUserId?: StringWithAggregatesFilter<"Campaign"> | string
    name?: StringWithAggregatesFilter<"Campaign"> | string
    description?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    archivedAt?: DateTimeNullableWithAggregatesFilter<"Campaign"> | Date | string | null
  }

  export type CampaignMemberWhereInput = {
    AND?: CampaignMemberWhereInput | CampaignMemberWhereInput[]
    OR?: CampaignMemberWhereInput[]
    NOT?: CampaignMemberWhereInput | CampaignMemberWhereInput[]
    id?: StringFilter<"CampaignMember"> | string
    campaignId?: StringFilter<"CampaignMember"> | string
    userId?: StringFilter<"CampaignMember"> | string
    role?: EnumCampaignRoleFilter<"CampaignMember"> | $Enums.CampaignRole
    displayName?: StringNullableFilter<"CampaignMember"> | string | null
    joinedAt?: DateTimeFilter<"CampaignMember"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"CampaignMember"> | Date | string | null
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CampaignMemberOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    displayName?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    campaign?: CampaignOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CampaignMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    campaignId_userId?: CampaignMemberCampaignIdUserIdCompoundUniqueInput
    AND?: CampaignMemberWhereInput | CampaignMemberWhereInput[]
    OR?: CampaignMemberWhereInput[]
    NOT?: CampaignMemberWhereInput | CampaignMemberWhereInput[]
    campaignId?: StringFilter<"CampaignMember"> | string
    userId?: StringFilter<"CampaignMember"> | string
    role?: EnumCampaignRoleFilter<"CampaignMember"> | $Enums.CampaignRole
    displayName?: StringNullableFilter<"CampaignMember"> | string | null
    joinedAt?: DateTimeFilter<"CampaignMember"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"CampaignMember"> | Date | string | null
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "campaignId_userId">

  export type CampaignMemberOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    displayName?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    _count?: CampaignMemberCountOrderByAggregateInput
    _max?: CampaignMemberMaxOrderByAggregateInput
    _min?: CampaignMemberMinOrderByAggregateInput
  }

  export type CampaignMemberScalarWhereWithAggregatesInput = {
    AND?: CampaignMemberScalarWhereWithAggregatesInput | CampaignMemberScalarWhereWithAggregatesInput[]
    OR?: CampaignMemberScalarWhereWithAggregatesInput[]
    NOT?: CampaignMemberScalarWhereWithAggregatesInput | CampaignMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CampaignMember"> | string
    campaignId?: StringWithAggregatesFilter<"CampaignMember"> | string
    userId?: StringWithAggregatesFilter<"CampaignMember"> | string
    role?: EnumCampaignRoleWithAggregatesFilter<"CampaignMember"> | $Enums.CampaignRole
    displayName?: StringNullableWithAggregatesFilter<"CampaignMember"> | string | null
    joinedAt?: DateTimeWithAggregatesFilter<"CampaignMember"> | Date | string
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"CampaignMember"> | Date | string | null
  }

  export type CampaignInviteWhereInput = {
    AND?: CampaignInviteWhereInput | CampaignInviteWhereInput[]
    OR?: CampaignInviteWhereInput[]
    NOT?: CampaignInviteWhereInput | CampaignInviteWhereInput[]
    id?: StringFilter<"CampaignInvite"> | string
    campaignId?: StringFilter<"CampaignInvite"> | string
    code?: StringFilter<"CampaignInvite"> | string
    roleOnJoin?: EnumCampaignRoleFilter<"CampaignInvite"> | $Enums.CampaignRole
    createdByUserId?: StringFilter<"CampaignInvite"> | string
    maxUses?: IntNullableFilter<"CampaignInvite"> | number | null
    usesCount?: IntFilter<"CampaignInvite"> | number
    expiresAt?: DateTimeNullableFilter<"CampaignInvite"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"CampaignInvite"> | Date | string | null
    createdAt?: DateTimeFilter<"CampaignInvite"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CampaignInviteOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    code?: SortOrder
    roleOnJoin?: SortOrder
    createdByUserId?: SortOrder
    maxUses?: SortOrderInput | SortOrder
    usesCount?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type CampaignInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: CampaignInviteWhereInput | CampaignInviteWhereInput[]
    OR?: CampaignInviteWhereInput[]
    NOT?: CampaignInviteWhereInput | CampaignInviteWhereInput[]
    campaignId?: StringFilter<"CampaignInvite"> | string
    roleOnJoin?: EnumCampaignRoleFilter<"CampaignInvite"> | $Enums.CampaignRole
    createdByUserId?: StringFilter<"CampaignInvite"> | string
    maxUses?: IntNullableFilter<"CampaignInvite"> | number | null
    usesCount?: IntFilter<"CampaignInvite"> | number
    expiresAt?: DateTimeNullableFilter<"CampaignInvite"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"CampaignInvite"> | Date | string | null
    createdAt?: DateTimeFilter<"CampaignInvite"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "code">

  export type CampaignInviteOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    code?: SortOrder
    roleOnJoin?: SortOrder
    createdByUserId?: SortOrder
    maxUses?: SortOrderInput | SortOrder
    usesCount?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CampaignInviteCountOrderByAggregateInput
    _avg?: CampaignInviteAvgOrderByAggregateInput
    _max?: CampaignInviteMaxOrderByAggregateInput
    _min?: CampaignInviteMinOrderByAggregateInput
    _sum?: CampaignInviteSumOrderByAggregateInput
  }

  export type CampaignInviteScalarWhereWithAggregatesInput = {
    AND?: CampaignInviteScalarWhereWithAggregatesInput | CampaignInviteScalarWhereWithAggregatesInput[]
    OR?: CampaignInviteScalarWhereWithAggregatesInput[]
    NOT?: CampaignInviteScalarWhereWithAggregatesInput | CampaignInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CampaignInvite"> | string
    campaignId?: StringWithAggregatesFilter<"CampaignInvite"> | string
    code?: StringWithAggregatesFilter<"CampaignInvite"> | string
    roleOnJoin?: EnumCampaignRoleWithAggregatesFilter<"CampaignInvite"> | $Enums.CampaignRole
    createdByUserId?: StringWithAggregatesFilter<"CampaignInvite"> | string
    maxUses?: IntNullableWithAggregatesFilter<"CampaignInvite"> | number | null
    usesCount?: IntWithAggregatesFilter<"CampaignInvite"> | number
    expiresAt?: DateTimeNullableWithAggregatesFilter<"CampaignInvite"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"CampaignInvite"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CampaignInvite"> | Date | string
  }

  export type CampaignSessionWhereInput = {
    AND?: CampaignSessionWhereInput | CampaignSessionWhereInput[]
    OR?: CampaignSessionWhereInput[]
    NOT?: CampaignSessionWhereInput | CampaignSessionWhereInput[]
    id?: StringFilter<"CampaignSession"> | string
    campaignId?: StringFilter<"CampaignSession"> | string
    activeMapId?: StringNullableFilter<"CampaignSession"> | string | null
    status?: EnumCampaignSessionStatusFilter<"CampaignSession"> | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFilter<"CampaignSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"CampaignSession"> | Date | string | null
    createdByUserId?: StringFilter<"CampaignSession"> | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CampaignSessionOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    activeMapId?: SortOrderInput | SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type CampaignSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignSessionWhereInput | CampaignSessionWhereInput[]
    OR?: CampaignSessionWhereInput[]
    NOT?: CampaignSessionWhereInput | CampaignSessionWhereInput[]
    campaignId?: StringFilter<"CampaignSession"> | string
    activeMapId?: StringNullableFilter<"CampaignSession"> | string | null
    status?: EnumCampaignSessionStatusFilter<"CampaignSession"> | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFilter<"CampaignSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"CampaignSession"> | Date | string | null
    createdByUserId?: StringFilter<"CampaignSession"> | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CampaignSessionOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    activeMapId?: SortOrderInput | SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    _count?: CampaignSessionCountOrderByAggregateInput
    _max?: CampaignSessionMaxOrderByAggregateInput
    _min?: CampaignSessionMinOrderByAggregateInput
  }

  export type CampaignSessionScalarWhereWithAggregatesInput = {
    AND?: CampaignSessionScalarWhereWithAggregatesInput | CampaignSessionScalarWhereWithAggregatesInput[]
    OR?: CampaignSessionScalarWhereWithAggregatesInput[]
    NOT?: CampaignSessionScalarWhereWithAggregatesInput | CampaignSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CampaignSession"> | string
    campaignId?: StringWithAggregatesFilter<"CampaignSession"> | string
    activeMapId?: StringNullableWithAggregatesFilter<"CampaignSession"> | string | null
    status?: EnumCampaignSessionStatusWithAggregatesFilter<"CampaignSession"> | $Enums.CampaignSessionStatus
    startedAt?: DateTimeWithAggregatesFilter<"CampaignSession"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"CampaignSession"> | Date | string | null
    createdByUserId?: StringWithAggregatesFilter<"CampaignSession"> | string
  }

  export type MapWhereInput = {
    AND?: MapWhereInput | MapWhereInput[]
    OR?: MapWhereInput[]
    NOT?: MapWhereInput | MapWhereInput[]
    id?: StringFilter<"Map"> | string
    campaignId?: StringFilter<"Map"> | string
    name?: StringFilter<"Map"> | string
    width?: IntFilter<"Map"> | number
    height?: IntFilter<"Map"> | number
    cellSize?: IntFilter<"Map"> | number
    gridType?: EnumGridTypeFilter<"Map"> | $Enums.GridType
    backgroundImage?: StringNullableFilter<"Map"> | string | null
    backgroundFitMode?: StringFilter<"Map"> | string
    backgroundOffsetX?: IntFilter<"Map"> | number
    backgroundOffsetY?: IntFilter<"Map"> | number
    backgroundScale?: FloatFilter<"Map"> | number
    gridOffsetX?: IntFilter<"Map"> | number
    gridOffsetY?: IntFilter<"Map"> | number
    gridColor?: StringFilter<"Map"> | string
    gridOpacity?: FloatFilter<"Map"> | number
    fogEnabled?: BoolFilter<"Map"> | boolean
    fogMode?: StringFilter<"Map"> | string
    fogOpacity?: FloatFilter<"Map"> | number
    fogPlayersSeeExplored?: BoolFilter<"Map"> | boolean
    layerConfigJson?: JsonNullableFilter<"Map">
    sortOrder?: IntFilter<"Map"> | number
    isArchived?: BoolFilter<"Map"> | boolean
    createdAt?: DateTimeFilter<"Map"> | Date | string
    updatedAt?: DateTimeFilter<"Map"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Map"> | Date | string | null
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    tokens?: MapTokenListRelationFilter
  }

  export type MapOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    cellSize?: SortOrder
    gridType?: SortOrder
    backgroundImage?: SortOrderInput | SortOrder
    backgroundFitMode?: SortOrder
    backgroundOffsetX?: SortOrder
    backgroundOffsetY?: SortOrder
    backgroundScale?: SortOrder
    gridOffsetX?: SortOrder
    gridOffsetY?: SortOrder
    gridColor?: SortOrder
    gridOpacity?: SortOrder
    fogEnabled?: SortOrder
    fogMode?: SortOrder
    fogOpacity?: SortOrder
    fogPlayersSeeExplored?: SortOrder
    layerConfigJson?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    campaign?: CampaignOrderByWithRelationInput
    tokens?: MapTokenOrderByRelationAggregateInput
  }

  export type MapWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MapWhereInput | MapWhereInput[]
    OR?: MapWhereInput[]
    NOT?: MapWhereInput | MapWhereInput[]
    campaignId?: StringFilter<"Map"> | string
    name?: StringFilter<"Map"> | string
    width?: IntFilter<"Map"> | number
    height?: IntFilter<"Map"> | number
    cellSize?: IntFilter<"Map"> | number
    gridType?: EnumGridTypeFilter<"Map"> | $Enums.GridType
    backgroundImage?: StringNullableFilter<"Map"> | string | null
    backgroundFitMode?: StringFilter<"Map"> | string
    backgroundOffsetX?: IntFilter<"Map"> | number
    backgroundOffsetY?: IntFilter<"Map"> | number
    backgroundScale?: FloatFilter<"Map"> | number
    gridOffsetX?: IntFilter<"Map"> | number
    gridOffsetY?: IntFilter<"Map"> | number
    gridColor?: StringFilter<"Map"> | string
    gridOpacity?: FloatFilter<"Map"> | number
    fogEnabled?: BoolFilter<"Map"> | boolean
    fogMode?: StringFilter<"Map"> | string
    fogOpacity?: FloatFilter<"Map"> | number
    fogPlayersSeeExplored?: BoolFilter<"Map"> | boolean
    layerConfigJson?: JsonNullableFilter<"Map">
    sortOrder?: IntFilter<"Map"> | number
    isArchived?: BoolFilter<"Map"> | boolean
    createdAt?: DateTimeFilter<"Map"> | Date | string
    updatedAt?: DateTimeFilter<"Map"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Map"> | Date | string | null
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    tokens?: MapTokenListRelationFilter
  }, "id">

  export type MapOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    cellSize?: SortOrder
    gridType?: SortOrder
    backgroundImage?: SortOrderInput | SortOrder
    backgroundFitMode?: SortOrder
    backgroundOffsetX?: SortOrder
    backgroundOffsetY?: SortOrder
    backgroundScale?: SortOrder
    gridOffsetX?: SortOrder
    gridOffsetY?: SortOrder
    gridColor?: SortOrder
    gridOpacity?: SortOrder
    fogEnabled?: SortOrder
    fogMode?: SortOrder
    fogOpacity?: SortOrder
    fogPlayersSeeExplored?: SortOrder
    layerConfigJson?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: MapCountOrderByAggregateInput
    _avg?: MapAvgOrderByAggregateInput
    _max?: MapMaxOrderByAggregateInput
    _min?: MapMinOrderByAggregateInput
    _sum?: MapSumOrderByAggregateInput
  }

  export type MapScalarWhereWithAggregatesInput = {
    AND?: MapScalarWhereWithAggregatesInput | MapScalarWhereWithAggregatesInput[]
    OR?: MapScalarWhereWithAggregatesInput[]
    NOT?: MapScalarWhereWithAggregatesInput | MapScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Map"> | string
    campaignId?: StringWithAggregatesFilter<"Map"> | string
    name?: StringWithAggregatesFilter<"Map"> | string
    width?: IntWithAggregatesFilter<"Map"> | number
    height?: IntWithAggregatesFilter<"Map"> | number
    cellSize?: IntWithAggregatesFilter<"Map"> | number
    gridType?: EnumGridTypeWithAggregatesFilter<"Map"> | $Enums.GridType
    backgroundImage?: StringNullableWithAggregatesFilter<"Map"> | string | null
    backgroundFitMode?: StringWithAggregatesFilter<"Map"> | string
    backgroundOffsetX?: IntWithAggregatesFilter<"Map"> | number
    backgroundOffsetY?: IntWithAggregatesFilter<"Map"> | number
    backgroundScale?: FloatWithAggregatesFilter<"Map"> | number
    gridOffsetX?: IntWithAggregatesFilter<"Map"> | number
    gridOffsetY?: IntWithAggregatesFilter<"Map"> | number
    gridColor?: StringWithAggregatesFilter<"Map"> | string
    gridOpacity?: FloatWithAggregatesFilter<"Map"> | number
    fogEnabled?: BoolWithAggregatesFilter<"Map"> | boolean
    fogMode?: StringWithAggregatesFilter<"Map"> | string
    fogOpacity?: FloatWithAggregatesFilter<"Map"> | number
    fogPlayersSeeExplored?: BoolWithAggregatesFilter<"Map"> | boolean
    layerConfigJson?: JsonNullableWithAggregatesFilter<"Map">
    sortOrder?: IntWithAggregatesFilter<"Map"> | number
    isArchived?: BoolWithAggregatesFilter<"Map"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Map"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Map"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Map"> | Date | string | null
  }

  export type MapTokenWhereInput = {
    AND?: MapTokenWhereInput | MapTokenWhereInput[]
    OR?: MapTokenWhereInput[]
    NOT?: MapTokenWhereInput | MapTokenWhereInput[]
    id?: StringFilter<"MapToken"> | string
    mapId?: StringFilter<"MapToken"> | string
    characterId?: StringNullableFilter<"MapToken"> | string | null
    name?: StringNullableFilter<"MapToken"> | string | null
    image?: StringNullableFilter<"MapToken"> | string | null
    x?: IntFilter<"MapToken"> | number
    y?: IntFilter<"MapToken"> | number
    widthCells?: IntFilter<"MapToken"> | number
    heightCells?: IntFilter<"MapToken"> | number
    rotation?: FloatFilter<"MapToken"> | number
    zIndex?: IntFilter<"MapToken"> | number
    scaleX?: FloatFilter<"MapToken"> | number
    scaleY?: FloatFilter<"MapToken"> | number
    layerKey?: StringFilter<"MapToken"> | string
    visibility?: EnumTokenVisibilityFilter<"MapToken"> | $Enums.TokenVisibility
    isLocked?: BoolFilter<"MapToken"> | boolean
    isHidden?: BoolFilter<"MapToken"> | boolean
    elevation?: IntFilter<"MapToken"> | number
    standMode?: StringFilter<"MapToken"> | string
    barsJson?: JsonNullableFilter<"MapToken">
    statusJson?: JsonNullableFilter<"MapToken">
    visionJson?: JsonNullableFilter<"MapToken">
    lightJson?: JsonNullableFilter<"MapToken">
    disposition?: EnumTokenDispositionFilter<"MapToken"> | $Enums.TokenDisposition
    createdAt?: DateTimeFilter<"MapToken"> | Date | string
    updatedAt?: DateTimeFilter<"MapToken"> | Date | string
    deletedAt?: DateTimeNullableFilter<"MapToken"> | Date | string | null
    map?: XOR<MapScalarRelationFilter, MapWhereInput>
    character?: XOR<CharacterNullableScalarRelationFilter, CharacterWhereInput> | null
  }

  export type MapTokenOrderByWithRelationInput = {
    id?: SortOrder
    mapId?: SortOrder
    characterId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    x?: SortOrder
    y?: SortOrder
    widthCells?: SortOrder
    heightCells?: SortOrder
    rotation?: SortOrder
    zIndex?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    layerKey?: SortOrder
    visibility?: SortOrder
    isLocked?: SortOrder
    isHidden?: SortOrder
    elevation?: SortOrder
    standMode?: SortOrder
    barsJson?: SortOrderInput | SortOrder
    statusJson?: SortOrderInput | SortOrder
    visionJson?: SortOrderInput | SortOrder
    lightJson?: SortOrderInput | SortOrder
    disposition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    map?: MapOrderByWithRelationInput
    character?: CharacterOrderByWithRelationInput
  }

  export type MapTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MapTokenWhereInput | MapTokenWhereInput[]
    OR?: MapTokenWhereInput[]
    NOT?: MapTokenWhereInput | MapTokenWhereInput[]
    mapId?: StringFilter<"MapToken"> | string
    characterId?: StringNullableFilter<"MapToken"> | string | null
    name?: StringNullableFilter<"MapToken"> | string | null
    image?: StringNullableFilter<"MapToken"> | string | null
    x?: IntFilter<"MapToken"> | number
    y?: IntFilter<"MapToken"> | number
    widthCells?: IntFilter<"MapToken"> | number
    heightCells?: IntFilter<"MapToken"> | number
    rotation?: FloatFilter<"MapToken"> | number
    zIndex?: IntFilter<"MapToken"> | number
    scaleX?: FloatFilter<"MapToken"> | number
    scaleY?: FloatFilter<"MapToken"> | number
    layerKey?: StringFilter<"MapToken"> | string
    visibility?: EnumTokenVisibilityFilter<"MapToken"> | $Enums.TokenVisibility
    isLocked?: BoolFilter<"MapToken"> | boolean
    isHidden?: BoolFilter<"MapToken"> | boolean
    elevation?: IntFilter<"MapToken"> | number
    standMode?: StringFilter<"MapToken"> | string
    barsJson?: JsonNullableFilter<"MapToken">
    statusJson?: JsonNullableFilter<"MapToken">
    visionJson?: JsonNullableFilter<"MapToken">
    lightJson?: JsonNullableFilter<"MapToken">
    disposition?: EnumTokenDispositionFilter<"MapToken"> | $Enums.TokenDisposition
    createdAt?: DateTimeFilter<"MapToken"> | Date | string
    updatedAt?: DateTimeFilter<"MapToken"> | Date | string
    deletedAt?: DateTimeNullableFilter<"MapToken"> | Date | string | null
    map?: XOR<MapScalarRelationFilter, MapWhereInput>
    character?: XOR<CharacterNullableScalarRelationFilter, CharacterWhereInput> | null
  }, "id">

  export type MapTokenOrderByWithAggregationInput = {
    id?: SortOrder
    mapId?: SortOrder
    characterId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    x?: SortOrder
    y?: SortOrder
    widthCells?: SortOrder
    heightCells?: SortOrder
    rotation?: SortOrder
    zIndex?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    layerKey?: SortOrder
    visibility?: SortOrder
    isLocked?: SortOrder
    isHidden?: SortOrder
    elevation?: SortOrder
    standMode?: SortOrder
    barsJson?: SortOrderInput | SortOrder
    statusJson?: SortOrderInput | SortOrder
    visionJson?: SortOrderInput | SortOrder
    lightJson?: SortOrderInput | SortOrder
    disposition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: MapTokenCountOrderByAggregateInput
    _avg?: MapTokenAvgOrderByAggregateInput
    _max?: MapTokenMaxOrderByAggregateInput
    _min?: MapTokenMinOrderByAggregateInput
    _sum?: MapTokenSumOrderByAggregateInput
  }

  export type MapTokenScalarWhereWithAggregatesInput = {
    AND?: MapTokenScalarWhereWithAggregatesInput | MapTokenScalarWhereWithAggregatesInput[]
    OR?: MapTokenScalarWhereWithAggregatesInput[]
    NOT?: MapTokenScalarWhereWithAggregatesInput | MapTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MapToken"> | string
    mapId?: StringWithAggregatesFilter<"MapToken"> | string
    characterId?: StringNullableWithAggregatesFilter<"MapToken"> | string | null
    name?: StringNullableWithAggregatesFilter<"MapToken"> | string | null
    image?: StringNullableWithAggregatesFilter<"MapToken"> | string | null
    x?: IntWithAggregatesFilter<"MapToken"> | number
    y?: IntWithAggregatesFilter<"MapToken"> | number
    widthCells?: IntWithAggregatesFilter<"MapToken"> | number
    heightCells?: IntWithAggregatesFilter<"MapToken"> | number
    rotation?: FloatWithAggregatesFilter<"MapToken"> | number
    zIndex?: IntWithAggregatesFilter<"MapToken"> | number
    scaleX?: FloatWithAggregatesFilter<"MapToken"> | number
    scaleY?: FloatWithAggregatesFilter<"MapToken"> | number
    layerKey?: StringWithAggregatesFilter<"MapToken"> | string
    visibility?: EnumTokenVisibilityWithAggregatesFilter<"MapToken"> | $Enums.TokenVisibility
    isLocked?: BoolWithAggregatesFilter<"MapToken"> | boolean
    isHidden?: BoolWithAggregatesFilter<"MapToken"> | boolean
    elevation?: IntWithAggregatesFilter<"MapToken"> | number
    standMode?: StringWithAggregatesFilter<"MapToken"> | string
    barsJson?: JsonNullableWithAggregatesFilter<"MapToken">
    statusJson?: JsonNullableWithAggregatesFilter<"MapToken">
    visionJson?: JsonNullableWithAggregatesFilter<"MapToken">
    lightJson?: JsonNullableWithAggregatesFilter<"MapToken">
    disposition?: EnumTokenDispositionWithAggregatesFilter<"MapToken"> | $Enums.TokenDisposition
    createdAt?: DateTimeWithAggregatesFilter<"MapToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MapToken"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"MapToken"> | Date | string | null
  }

  export type CharacterWhereInput = {
    AND?: CharacterWhereInput | CharacterWhereInput[]
    OR?: CharacterWhereInput[]
    NOT?: CharacterWhereInput | CharacterWhereInput[]
    id?: StringFilter<"Character"> | string
    campaignId?: StringFilter<"Character"> | string
    ownerUserId?: StringNullableFilter<"Character"> | string | null
    createdByUserId?: StringFilter<"Character"> | string
    name?: StringFilter<"Character"> | string
    type?: EnumCharacterTypeFilter<"Character"> | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFilter<"Character"> | $Enums.CharacterVisibility
    portraitImage?: StringNullableFilter<"Character"> | string | null
    defaultTokenImage?: StringNullableFilter<"Character"> | string | null
    system?: StringFilter<"Character"> | string
    createdAt?: DateTimeFilter<"Character"> | Date | string
    updatedAt?: DateTimeFilter<"Character"> | Date | string
    archivedAt?: DateTimeNullableFilter<"Character"> | Date | string | null
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    sheet?: XOR<CharacterSheetNullableScalarRelationFilter, CharacterSheetWhereInput> | null
    permissions?: CharacterPermissionListRelationFilter
    tokens?: MapTokenListRelationFilter
  }

  export type CharacterOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    ownerUserId?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    portraitImage?: SortOrderInput | SortOrder
    defaultTokenImage?: SortOrderInput | SortOrder
    system?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrderInput | SortOrder
    campaign?: CampaignOrderByWithRelationInput
    sheet?: CharacterSheetOrderByWithRelationInput
    permissions?: CharacterPermissionOrderByRelationAggregateInput
    tokens?: MapTokenOrderByRelationAggregateInput
  }

  export type CharacterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CharacterWhereInput | CharacterWhereInput[]
    OR?: CharacterWhereInput[]
    NOT?: CharacterWhereInput | CharacterWhereInput[]
    campaignId?: StringFilter<"Character"> | string
    ownerUserId?: StringNullableFilter<"Character"> | string | null
    createdByUserId?: StringFilter<"Character"> | string
    name?: StringFilter<"Character"> | string
    type?: EnumCharacterTypeFilter<"Character"> | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFilter<"Character"> | $Enums.CharacterVisibility
    portraitImage?: StringNullableFilter<"Character"> | string | null
    defaultTokenImage?: StringNullableFilter<"Character"> | string | null
    system?: StringFilter<"Character"> | string
    createdAt?: DateTimeFilter<"Character"> | Date | string
    updatedAt?: DateTimeFilter<"Character"> | Date | string
    archivedAt?: DateTimeNullableFilter<"Character"> | Date | string | null
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    sheet?: XOR<CharacterSheetNullableScalarRelationFilter, CharacterSheetWhereInput> | null
    permissions?: CharacterPermissionListRelationFilter
    tokens?: MapTokenListRelationFilter
  }, "id">

  export type CharacterOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    ownerUserId?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    portraitImage?: SortOrderInput | SortOrder
    defaultTokenImage?: SortOrderInput | SortOrder
    system?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrderInput | SortOrder
    _count?: CharacterCountOrderByAggregateInput
    _max?: CharacterMaxOrderByAggregateInput
    _min?: CharacterMinOrderByAggregateInput
  }

  export type CharacterScalarWhereWithAggregatesInput = {
    AND?: CharacterScalarWhereWithAggregatesInput | CharacterScalarWhereWithAggregatesInput[]
    OR?: CharacterScalarWhereWithAggregatesInput[]
    NOT?: CharacterScalarWhereWithAggregatesInput | CharacterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Character"> | string
    campaignId?: StringWithAggregatesFilter<"Character"> | string
    ownerUserId?: StringNullableWithAggregatesFilter<"Character"> | string | null
    createdByUserId?: StringWithAggregatesFilter<"Character"> | string
    name?: StringWithAggregatesFilter<"Character"> | string
    type?: EnumCharacterTypeWithAggregatesFilter<"Character"> | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityWithAggregatesFilter<"Character"> | $Enums.CharacterVisibility
    portraitImage?: StringNullableWithAggregatesFilter<"Character"> | string | null
    defaultTokenImage?: StringNullableWithAggregatesFilter<"Character"> | string | null
    system?: StringWithAggregatesFilter<"Character"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Character"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Character"> | Date | string
    archivedAt?: DateTimeNullableWithAggregatesFilter<"Character"> | Date | string | null
  }

  export type CharacterSheetWhereInput = {
    AND?: CharacterSheetWhereInput | CharacterSheetWhereInput[]
    OR?: CharacterSheetWhereInput[]
    NOT?: CharacterSheetWhereInput | CharacterSheetWhereInput[]
    id?: StringFilter<"CharacterSheet"> | string
    characterId?: StringFilter<"CharacterSheet"> | string
    system?: StringFilter<"CharacterSheet"> | string
    schemaVersion?: IntFilter<"CharacterSheet"> | number
    dataJson?: JsonFilter<"CharacterSheet">
    version?: IntFilter<"CharacterSheet"> | number
    lastEditedByUserId?: StringNullableFilter<"CharacterSheet"> | string | null
    updatedAt?: DateTimeFilter<"CharacterSheet"> | Date | string
    character?: XOR<CharacterScalarRelationFilter, CharacterWhereInput>
  }

  export type CharacterSheetOrderByWithRelationInput = {
    id?: SortOrder
    characterId?: SortOrder
    system?: SortOrder
    schemaVersion?: SortOrder
    dataJson?: SortOrder
    version?: SortOrder
    lastEditedByUserId?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    character?: CharacterOrderByWithRelationInput
  }

  export type CharacterSheetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    characterId?: string
    AND?: CharacterSheetWhereInput | CharacterSheetWhereInput[]
    OR?: CharacterSheetWhereInput[]
    NOT?: CharacterSheetWhereInput | CharacterSheetWhereInput[]
    system?: StringFilter<"CharacterSheet"> | string
    schemaVersion?: IntFilter<"CharacterSheet"> | number
    dataJson?: JsonFilter<"CharacterSheet">
    version?: IntFilter<"CharacterSheet"> | number
    lastEditedByUserId?: StringNullableFilter<"CharacterSheet"> | string | null
    updatedAt?: DateTimeFilter<"CharacterSheet"> | Date | string
    character?: XOR<CharacterScalarRelationFilter, CharacterWhereInput>
  }, "id" | "characterId">

  export type CharacterSheetOrderByWithAggregationInput = {
    id?: SortOrder
    characterId?: SortOrder
    system?: SortOrder
    schemaVersion?: SortOrder
    dataJson?: SortOrder
    version?: SortOrder
    lastEditedByUserId?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: CharacterSheetCountOrderByAggregateInput
    _avg?: CharacterSheetAvgOrderByAggregateInput
    _max?: CharacterSheetMaxOrderByAggregateInput
    _min?: CharacterSheetMinOrderByAggregateInput
    _sum?: CharacterSheetSumOrderByAggregateInput
  }

  export type CharacterSheetScalarWhereWithAggregatesInput = {
    AND?: CharacterSheetScalarWhereWithAggregatesInput | CharacterSheetScalarWhereWithAggregatesInput[]
    OR?: CharacterSheetScalarWhereWithAggregatesInput[]
    NOT?: CharacterSheetScalarWhereWithAggregatesInput | CharacterSheetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CharacterSheet"> | string
    characterId?: StringWithAggregatesFilter<"CharacterSheet"> | string
    system?: StringWithAggregatesFilter<"CharacterSheet"> | string
    schemaVersion?: IntWithAggregatesFilter<"CharacterSheet"> | number
    dataJson?: JsonWithAggregatesFilter<"CharacterSheet">
    version?: IntWithAggregatesFilter<"CharacterSheet"> | number
    lastEditedByUserId?: StringNullableWithAggregatesFilter<"CharacterSheet"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"CharacterSheet"> | Date | string
  }

  export type CharacterPermissionWhereInput = {
    AND?: CharacterPermissionWhereInput | CharacterPermissionWhereInput[]
    OR?: CharacterPermissionWhereInput[]
    NOT?: CharacterPermissionWhereInput | CharacterPermissionWhereInput[]
    id?: StringFilter<"CharacterPermission"> | string
    characterId?: StringFilter<"CharacterPermission"> | string
    userId?: StringFilter<"CharacterPermission"> | string
    canView?: BoolFilter<"CharacterPermission"> | boolean
    canEdit?: BoolFilter<"CharacterPermission"> | boolean
    canControl?: BoolFilter<"CharacterPermission"> | boolean
    character?: XOR<CharacterScalarRelationFilter, CharacterWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CharacterPermissionOrderByWithRelationInput = {
    id?: SortOrder
    characterId?: SortOrder
    userId?: SortOrder
    canView?: SortOrder
    canEdit?: SortOrder
    canControl?: SortOrder
    character?: CharacterOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CharacterPermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    characterId_userId?: CharacterPermissionCharacterIdUserIdCompoundUniqueInput
    AND?: CharacterPermissionWhereInput | CharacterPermissionWhereInput[]
    OR?: CharacterPermissionWhereInput[]
    NOT?: CharacterPermissionWhereInput | CharacterPermissionWhereInput[]
    characterId?: StringFilter<"CharacterPermission"> | string
    userId?: StringFilter<"CharacterPermission"> | string
    canView?: BoolFilter<"CharacterPermission"> | boolean
    canEdit?: BoolFilter<"CharacterPermission"> | boolean
    canControl?: BoolFilter<"CharacterPermission"> | boolean
    character?: XOR<CharacterScalarRelationFilter, CharacterWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "characterId_userId">

  export type CharacterPermissionOrderByWithAggregationInput = {
    id?: SortOrder
    characterId?: SortOrder
    userId?: SortOrder
    canView?: SortOrder
    canEdit?: SortOrder
    canControl?: SortOrder
    _count?: CharacterPermissionCountOrderByAggregateInput
    _max?: CharacterPermissionMaxOrderByAggregateInput
    _min?: CharacterPermissionMinOrderByAggregateInput
  }

  export type CharacterPermissionScalarWhereWithAggregatesInput = {
    AND?: CharacterPermissionScalarWhereWithAggregatesInput | CharacterPermissionScalarWhereWithAggregatesInput[]
    OR?: CharacterPermissionScalarWhereWithAggregatesInput[]
    NOT?: CharacterPermissionScalarWhereWithAggregatesInput | CharacterPermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CharacterPermission"> | string
    characterId?: StringWithAggregatesFilter<"CharacterPermission"> | string
    userId?: StringWithAggregatesFilter<"CharacterPermission"> | string
    canView?: BoolWithAggregatesFilter<"CharacterPermission"> | boolean
    canEdit?: BoolWithAggregatesFilter<"CharacterPermission"> | boolean
    canControl?: BoolWithAggregatesFilter<"CharacterPermission"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberUncheckedCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteUncheckedCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionUncheckedCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUncheckedUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUncheckedUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateInput = {
    id?: string
    refreshTokenHash?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type UserSessionUncheckedCreateInput = {
    id?: string
    userId: string
    refreshTokenHash?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type UserSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateManyInput = {
    id?: string
    userId: string
    refreshTokenHash?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedCampaignsInput
    members?: CampaignMemberCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionCreateNestedManyWithoutCampaignInput
    maps?: MapCreateNestedManyWithoutCampaignInput
    characters?: CharacterCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    ownerUserId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    members?: CampaignMemberUncheckedCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteUncheckedCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionUncheckedCreateNestedManyWithoutCampaignInput
    maps?: MapUncheckedCreateNestedManyWithoutCampaignInput
    characters?: CharacterUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedCampaignsNestedInput
    members?: CampaignMemberUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUpdateManyWithoutCampaignNestedInput
    maps?: MapUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: CampaignMemberUncheckedUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUncheckedUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUncheckedUpdateManyWithoutCampaignNestedInput
    maps?: MapUncheckedUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    ownerUserId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignMemberCreateInput = {
    id?: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutCampaignMembersInput
  }

  export type CampaignMemberUncheckedCreateInput = {
    id?: string
    campaignId: string
    userId: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
  }

  export type CampaignMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutCampaignMembersNestedInput
  }

  export type CampaignMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignMemberCreateManyInput = {
    id?: string
    campaignId: string
    userId: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
  }

  export type CampaignMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignInviteCreateInput = {
    id?: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutInvitesInput
    createdBy: UserCreateNestedOneWithoutCreatedCampaignInvitesInput
  }

  export type CampaignInviteUncheckedCreateInput = {
    id?: string
    campaignId: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    createdByUserId: string
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CampaignInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutInvitesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCampaignInvitesNestedInput
  }

  export type CampaignInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    createdByUserId?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignInviteCreateManyInput = {
    id?: string
    campaignId: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    createdByUserId: string
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CampaignInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    createdByUserId?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignSessionCreateInput = {
    id?: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutSessionsInput
    createdBy: UserCreateNestedOneWithoutCreatedCampaignSessionsInput
  }

  export type CampaignSessionUncheckedCreateInput = {
    id?: string
    campaignId: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdByUserId: string
  }

  export type CampaignSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutSessionsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCampaignSessionsNestedInput
  }

  export type CampaignSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type CampaignSessionCreateManyInput = {
    id?: string
    campaignId: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdByUserId: string
  }

  export type CampaignSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type MapCreateInput = {
    id?: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType?: $Enums.GridType
    backgroundImage?: string | null
    backgroundFitMode?: string
    backgroundOffsetX?: number
    backgroundOffsetY?: number
    backgroundScale?: number
    gridOffsetX?: number
    gridOffsetY?: number
    gridColor?: string
    gridOpacity?: number
    fogEnabled?: boolean
    fogMode?: string
    fogOpacity?: number
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: number
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutMapsInput
    tokens?: MapTokenCreateNestedManyWithoutMapInput
  }

  export type MapUncheckedCreateInput = {
    id?: string
    campaignId: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType?: $Enums.GridType
    backgroundImage?: string | null
    backgroundFitMode?: string
    backgroundOffsetX?: number
    backgroundOffsetY?: number
    backgroundScale?: number
    gridOffsetX?: number
    gridOffsetY?: number
    gridColor?: string
    gridOpacity?: number
    fogEnabled?: boolean
    fogMode?: string
    fogOpacity?: number
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: number
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    tokens?: MapTokenUncheckedCreateNestedManyWithoutMapInput
  }

  export type MapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutMapsNestedInput
    tokens?: MapTokenUpdateManyWithoutMapNestedInput
  }

  export type MapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tokens?: MapTokenUncheckedUpdateManyWithoutMapNestedInput
  }

  export type MapCreateManyInput = {
    id?: string
    campaignId: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType?: $Enums.GridType
    backgroundImage?: string | null
    backgroundFitMode?: string
    backgroundOffsetX?: number
    backgroundOffsetY?: number
    backgroundScale?: number
    gridOffsetX?: number
    gridOffsetY?: number
    gridColor?: string
    gridOpacity?: number
    fogEnabled?: boolean
    fogMode?: string
    fogOpacity?: number
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: number
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MapTokenCreateInput = {
    id?: string
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    map: MapCreateNestedOneWithoutTokensInput
    character?: CharacterCreateNestedOneWithoutTokensInput
  }

  export type MapTokenUncheckedCreateInput = {
    id?: string
    mapId: string
    characterId?: string | null
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MapTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    map?: MapUpdateOneRequiredWithoutTokensNestedInput
    character?: CharacterUpdateOneWithoutTokensNestedInput
  }

  export type MapTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: StringFieldUpdateOperationsInput | string
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MapTokenCreateManyInput = {
    id?: string
    mapId: string
    characterId?: string | null
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MapTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MapTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: StringFieldUpdateOperationsInput | string
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CharacterCreateInput = {
    id?: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutCharactersInput
    sheet?: CharacterSheetCreateNestedOneWithoutCharacterInput
    permissions?: CharacterPermissionCreateNestedManyWithoutCharacterInput
    tokens?: MapTokenCreateNestedManyWithoutCharacterInput
  }

  export type CharacterUncheckedCreateInput = {
    id?: string
    campaignId: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    sheet?: CharacterSheetUncheckedCreateNestedOneWithoutCharacterInput
    permissions?: CharacterPermissionUncheckedCreateNestedManyWithoutCharacterInput
    tokens?: MapTokenUncheckedCreateNestedManyWithoutCharacterInput
  }

  export type CharacterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutCharactersNestedInput
    sheet?: CharacterSheetUpdateOneWithoutCharacterNestedInput
    permissions?: CharacterPermissionUpdateManyWithoutCharacterNestedInput
    tokens?: MapTokenUpdateManyWithoutCharacterNestedInput
  }

  export type CharacterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheet?: CharacterSheetUncheckedUpdateOneWithoutCharacterNestedInput
    permissions?: CharacterPermissionUncheckedUpdateManyWithoutCharacterNestedInput
    tokens?: MapTokenUncheckedUpdateManyWithoutCharacterNestedInput
  }

  export type CharacterCreateManyInput = {
    id?: string
    campaignId: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
  }

  export type CharacterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CharacterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CharacterSheetCreateInput = {
    id?: string
    system?: string
    schemaVersion?: number
    dataJson: JsonNullValueInput | InputJsonValue
    version?: number
    lastEditedByUserId?: string | null
    updatedAt?: Date | string
    character: CharacterCreateNestedOneWithoutSheetInput
  }

  export type CharacterSheetUncheckedCreateInput = {
    id?: string
    characterId: string
    system?: string
    schemaVersion?: number
    dataJson: JsonNullValueInput | InputJsonValue
    version?: number
    lastEditedByUserId?: string | null
    updatedAt?: Date | string
  }

  export type CharacterSheetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    schemaVersion?: IntFieldUpdateOperationsInput | number
    dataJson?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    lastEditedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    character?: CharacterUpdateOneRequiredWithoutSheetNestedInput
  }

  export type CharacterSheetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    characterId?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    schemaVersion?: IntFieldUpdateOperationsInput | number
    dataJson?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    lastEditedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterSheetCreateManyInput = {
    id?: string
    characterId: string
    system?: string
    schemaVersion?: number
    dataJson: JsonNullValueInput | InputJsonValue
    version?: number
    lastEditedByUserId?: string | null
    updatedAt?: Date | string
  }

  export type CharacterSheetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    schemaVersion?: IntFieldUpdateOperationsInput | number
    dataJson?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    lastEditedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterSheetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    characterId?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    schemaVersion?: IntFieldUpdateOperationsInput | number
    dataJson?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    lastEditedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterPermissionCreateInput = {
    id?: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
    character: CharacterCreateNestedOneWithoutPermissionsInput
    user: UserCreateNestedOneWithoutCharacterPermissionsInput
  }

  export type CharacterPermissionUncheckedCreateInput = {
    id?: string
    characterId: string
    userId: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
  }

  export type CharacterPermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
    character?: CharacterUpdateOneRequiredWithoutPermissionsNestedInput
    user?: UserUpdateOneRequiredWithoutCharacterPermissionsNestedInput
  }

  export type CharacterPermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    characterId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CharacterPermissionCreateManyInput = {
    id?: string
    characterId: string
    userId: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
  }

  export type CharacterPermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CharacterPermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    characterId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserSessionListRelationFilter = {
    every?: UserSessionWhereInput
    some?: UserSessionWhereInput
    none?: UserSessionWhereInput
  }

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput
    some?: CampaignWhereInput
    none?: CampaignWhereInput
  }

  export type CampaignMemberListRelationFilter = {
    every?: CampaignMemberWhereInput
    some?: CampaignMemberWhereInput
    none?: CampaignMemberWhereInput
  }

  export type CampaignInviteListRelationFilter = {
    every?: CampaignInviteWhereInput
    some?: CampaignInviteWhereInput
    none?: CampaignInviteWhereInput
  }

  export type CampaignSessionListRelationFilter = {
    every?: CampaignSessionWhereInput
    some?: CampaignSessionWhereInput
    none?: CampaignSessionWhereInput
  }

  export type CharacterPermissionListRelationFilter = {
    every?: CharacterPermissionWhereInput
    some?: CharacterPermissionWhereInput
    none?: CharacterPermissionWhereInput
  }

  export type UserSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CharacterPermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshTokenHash?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshTokenHash?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshTokenHash?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type MapListRelationFilter = {
    every?: MapWhereInput
    some?: MapWhereInput
    none?: MapWhereInput
  }

  export type CharacterListRelationFilter = {
    every?: CharacterWhereInput
    some?: CharacterWhereInput
    none?: CharacterWhereInput
  }

  export type MapOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CharacterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type EnumCampaignRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignRole | EnumCampaignRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignRole[] | ListEnumCampaignRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignRole[] | ListEnumCampaignRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignRoleFilter<$PrismaModel> | $Enums.CampaignRole
  }

  export type CampaignScalarRelationFilter = {
    is?: CampaignWhereInput
    isNot?: CampaignWhereInput
  }

  export type CampaignMemberCampaignIdUserIdCompoundUniqueInput = {
    campaignId: string
    userId: string
  }

  export type CampaignMemberCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    displayName?: SortOrder
    joinedAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type CampaignMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    displayName?: SortOrder
    joinedAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type CampaignMemberMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    displayName?: SortOrder
    joinedAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type EnumCampaignRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignRole | EnumCampaignRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignRole[] | ListEnumCampaignRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignRole[] | ListEnumCampaignRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignRoleWithAggregatesFilter<$PrismaModel> | $Enums.CampaignRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignRoleFilter<$PrismaModel>
    _max?: NestedEnumCampaignRoleFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CampaignInviteCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    code?: SortOrder
    roleOnJoin?: SortOrder
    createdByUserId?: SortOrder
    maxUses?: SortOrder
    usesCount?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CampaignInviteAvgOrderByAggregateInput = {
    maxUses?: SortOrder
    usesCount?: SortOrder
  }

  export type CampaignInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    code?: SortOrder
    roleOnJoin?: SortOrder
    createdByUserId?: SortOrder
    maxUses?: SortOrder
    usesCount?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CampaignInviteMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    code?: SortOrder
    roleOnJoin?: SortOrder
    createdByUserId?: SortOrder
    maxUses?: SortOrder
    usesCount?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CampaignInviteSumOrderByAggregateInput = {
    maxUses?: SortOrder
    usesCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type EnumCampaignSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignSessionStatus | EnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignSessionStatus[] | ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignSessionStatus[] | ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignSessionStatusFilter<$PrismaModel> | $Enums.CampaignSessionStatus
  }

  export type CampaignSessionCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    activeMapId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type CampaignSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    activeMapId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type CampaignSessionMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    activeMapId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type EnumCampaignSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignSessionStatus | EnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignSessionStatus[] | ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignSessionStatus[] | ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignSessionStatusFilter<$PrismaModel>
  }

  export type EnumGridTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GridType | EnumGridTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GridType[] | ListEnumGridTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GridType[] | ListEnumGridTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGridTypeFilter<$PrismaModel> | $Enums.GridType
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MapTokenListRelationFilter = {
    every?: MapTokenWhereInput
    some?: MapTokenWhereInput
    none?: MapTokenWhereInput
  }

  export type MapTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MapCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    cellSize?: SortOrder
    gridType?: SortOrder
    backgroundImage?: SortOrder
    backgroundFitMode?: SortOrder
    backgroundOffsetX?: SortOrder
    backgroundOffsetY?: SortOrder
    backgroundScale?: SortOrder
    gridOffsetX?: SortOrder
    gridOffsetY?: SortOrder
    gridColor?: SortOrder
    gridOpacity?: SortOrder
    fogEnabled?: SortOrder
    fogMode?: SortOrder
    fogOpacity?: SortOrder
    fogPlayersSeeExplored?: SortOrder
    layerConfigJson?: SortOrder
    sortOrder?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MapAvgOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
    cellSize?: SortOrder
    backgroundOffsetX?: SortOrder
    backgroundOffsetY?: SortOrder
    backgroundScale?: SortOrder
    gridOffsetX?: SortOrder
    gridOffsetY?: SortOrder
    gridOpacity?: SortOrder
    fogOpacity?: SortOrder
    sortOrder?: SortOrder
  }

  export type MapMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    cellSize?: SortOrder
    gridType?: SortOrder
    backgroundImage?: SortOrder
    backgroundFitMode?: SortOrder
    backgroundOffsetX?: SortOrder
    backgroundOffsetY?: SortOrder
    backgroundScale?: SortOrder
    gridOffsetX?: SortOrder
    gridOffsetY?: SortOrder
    gridColor?: SortOrder
    gridOpacity?: SortOrder
    fogEnabled?: SortOrder
    fogMode?: SortOrder
    fogOpacity?: SortOrder
    fogPlayersSeeExplored?: SortOrder
    sortOrder?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MapMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    cellSize?: SortOrder
    gridType?: SortOrder
    backgroundImage?: SortOrder
    backgroundFitMode?: SortOrder
    backgroundOffsetX?: SortOrder
    backgroundOffsetY?: SortOrder
    backgroundScale?: SortOrder
    gridOffsetX?: SortOrder
    gridOffsetY?: SortOrder
    gridColor?: SortOrder
    gridOpacity?: SortOrder
    fogEnabled?: SortOrder
    fogMode?: SortOrder
    fogOpacity?: SortOrder
    fogPlayersSeeExplored?: SortOrder
    sortOrder?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MapSumOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
    cellSize?: SortOrder
    backgroundOffsetX?: SortOrder
    backgroundOffsetY?: SortOrder
    backgroundScale?: SortOrder
    gridOffsetX?: SortOrder
    gridOffsetY?: SortOrder
    gridOpacity?: SortOrder
    fogOpacity?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumGridTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GridType | EnumGridTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GridType[] | ListEnumGridTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GridType[] | ListEnumGridTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGridTypeWithAggregatesFilter<$PrismaModel> | $Enums.GridType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGridTypeFilter<$PrismaModel>
    _max?: NestedEnumGridTypeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumTokenVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenVisibility | EnumTokenVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.TokenVisibility[] | ListEnumTokenVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenVisibility[] | ListEnumTokenVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenVisibilityFilter<$PrismaModel> | $Enums.TokenVisibility
  }

  export type EnumTokenDispositionFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenDisposition | EnumTokenDispositionFieldRefInput<$PrismaModel>
    in?: $Enums.TokenDisposition[] | ListEnumTokenDispositionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenDisposition[] | ListEnumTokenDispositionFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenDispositionFilter<$PrismaModel> | $Enums.TokenDisposition
  }

  export type MapScalarRelationFilter = {
    is?: MapWhereInput
    isNot?: MapWhereInput
  }

  export type CharacterNullableScalarRelationFilter = {
    is?: CharacterWhereInput | null
    isNot?: CharacterWhereInput | null
  }

  export type MapTokenCountOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    characterId?: SortOrder
    name?: SortOrder
    image?: SortOrder
    x?: SortOrder
    y?: SortOrder
    widthCells?: SortOrder
    heightCells?: SortOrder
    rotation?: SortOrder
    zIndex?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    layerKey?: SortOrder
    visibility?: SortOrder
    isLocked?: SortOrder
    isHidden?: SortOrder
    elevation?: SortOrder
    standMode?: SortOrder
    barsJson?: SortOrder
    statusJson?: SortOrder
    visionJson?: SortOrder
    lightJson?: SortOrder
    disposition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MapTokenAvgOrderByAggregateInput = {
    x?: SortOrder
    y?: SortOrder
    widthCells?: SortOrder
    heightCells?: SortOrder
    rotation?: SortOrder
    zIndex?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    elevation?: SortOrder
  }

  export type MapTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    characterId?: SortOrder
    name?: SortOrder
    image?: SortOrder
    x?: SortOrder
    y?: SortOrder
    widthCells?: SortOrder
    heightCells?: SortOrder
    rotation?: SortOrder
    zIndex?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    layerKey?: SortOrder
    visibility?: SortOrder
    isLocked?: SortOrder
    isHidden?: SortOrder
    elevation?: SortOrder
    standMode?: SortOrder
    disposition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MapTokenMinOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    characterId?: SortOrder
    name?: SortOrder
    image?: SortOrder
    x?: SortOrder
    y?: SortOrder
    widthCells?: SortOrder
    heightCells?: SortOrder
    rotation?: SortOrder
    zIndex?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    layerKey?: SortOrder
    visibility?: SortOrder
    isLocked?: SortOrder
    isHidden?: SortOrder
    elevation?: SortOrder
    standMode?: SortOrder
    disposition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MapTokenSumOrderByAggregateInput = {
    x?: SortOrder
    y?: SortOrder
    widthCells?: SortOrder
    heightCells?: SortOrder
    rotation?: SortOrder
    zIndex?: SortOrder
    scaleX?: SortOrder
    scaleY?: SortOrder
    elevation?: SortOrder
  }

  export type EnumTokenVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenVisibility | EnumTokenVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.TokenVisibility[] | ListEnumTokenVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenVisibility[] | ListEnumTokenVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.TokenVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenVisibilityFilter<$PrismaModel>
    _max?: NestedEnumTokenVisibilityFilter<$PrismaModel>
  }

  export type EnumTokenDispositionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenDisposition | EnumTokenDispositionFieldRefInput<$PrismaModel>
    in?: $Enums.TokenDisposition[] | ListEnumTokenDispositionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenDisposition[] | ListEnumTokenDispositionFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenDispositionWithAggregatesFilter<$PrismaModel> | $Enums.TokenDisposition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenDispositionFilter<$PrismaModel>
    _max?: NestedEnumTokenDispositionFilter<$PrismaModel>
  }

  export type EnumCharacterTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CharacterType | EnumCharacterTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CharacterType[] | ListEnumCharacterTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CharacterType[] | ListEnumCharacterTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCharacterTypeFilter<$PrismaModel> | $Enums.CharacterType
  }

  export type EnumCharacterVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.CharacterVisibility | EnumCharacterVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.CharacterVisibility[] | ListEnumCharacterVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CharacterVisibility[] | ListEnumCharacterVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumCharacterVisibilityFilter<$PrismaModel> | $Enums.CharacterVisibility
  }

  export type CharacterSheetNullableScalarRelationFilter = {
    is?: CharacterSheetWhereInput | null
    isNot?: CharacterSheetWhereInput | null
  }

  export type CharacterCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    ownerUserId?: SortOrder
    createdByUserId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    portraitImage?: SortOrder
    defaultTokenImage?: SortOrder
    system?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type CharacterMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    ownerUserId?: SortOrder
    createdByUserId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    portraitImage?: SortOrder
    defaultTokenImage?: SortOrder
    system?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type CharacterMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    ownerUserId?: SortOrder
    createdByUserId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    portraitImage?: SortOrder
    defaultTokenImage?: SortOrder
    system?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archivedAt?: SortOrder
  }

  export type EnumCharacterTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CharacterType | EnumCharacterTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CharacterType[] | ListEnumCharacterTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CharacterType[] | ListEnumCharacterTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCharacterTypeWithAggregatesFilter<$PrismaModel> | $Enums.CharacterType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCharacterTypeFilter<$PrismaModel>
    _max?: NestedEnumCharacterTypeFilter<$PrismaModel>
  }

  export type EnumCharacterVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CharacterVisibility | EnumCharacterVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.CharacterVisibility[] | ListEnumCharacterVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CharacterVisibility[] | ListEnumCharacterVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumCharacterVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.CharacterVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCharacterVisibilityFilter<$PrismaModel>
    _max?: NestedEnumCharacterVisibilityFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CharacterScalarRelationFilter = {
    is?: CharacterWhereInput
    isNot?: CharacterWhereInput
  }

  export type CharacterSheetCountOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    system?: SortOrder
    schemaVersion?: SortOrder
    dataJson?: SortOrder
    version?: SortOrder
    lastEditedByUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharacterSheetAvgOrderByAggregateInput = {
    schemaVersion?: SortOrder
    version?: SortOrder
  }

  export type CharacterSheetMaxOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    system?: SortOrder
    schemaVersion?: SortOrder
    version?: SortOrder
    lastEditedByUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharacterSheetMinOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    system?: SortOrder
    schemaVersion?: SortOrder
    version?: SortOrder
    lastEditedByUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharacterSheetSumOrderByAggregateInput = {
    schemaVersion?: SortOrder
    version?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type CharacterPermissionCharacterIdUserIdCompoundUniqueInput = {
    characterId: string
    userId: string
  }

  export type CharacterPermissionCountOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    userId?: SortOrder
    canView?: SortOrder
    canEdit?: SortOrder
    canControl?: SortOrder
  }

  export type CharacterPermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    userId?: SortOrder
    canView?: SortOrder
    canEdit?: SortOrder
    canControl?: SortOrder
  }

  export type CharacterPermissionMinOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    userId?: SortOrder
    canView?: SortOrder
    canEdit?: SortOrder
    canControl?: SortOrder
  }

  export type UserSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type CampaignCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput> | CampaignCreateWithoutOwnerInput[] | CampaignUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutOwnerInput | CampaignCreateOrConnectWithoutOwnerInput[]
    createMany?: CampaignCreateManyOwnerInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type CampaignMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<CampaignMemberCreateWithoutUserInput, CampaignMemberUncheckedCreateWithoutUserInput> | CampaignMemberCreateWithoutUserInput[] | CampaignMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CampaignMemberCreateOrConnectWithoutUserInput | CampaignMemberCreateOrConnectWithoutUserInput[]
    createMany?: CampaignMemberCreateManyUserInputEnvelope
    connect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
  }

  export type CampaignInviteCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CampaignInviteCreateWithoutCreatedByInput, CampaignInviteUncheckedCreateWithoutCreatedByInput> | CampaignInviteCreateWithoutCreatedByInput[] | CampaignInviteUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignInviteCreateOrConnectWithoutCreatedByInput | CampaignInviteCreateOrConnectWithoutCreatedByInput[]
    createMany?: CampaignInviteCreateManyCreatedByInputEnvelope
    connect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
  }

  export type CampaignSessionCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CampaignSessionCreateWithoutCreatedByInput, CampaignSessionUncheckedCreateWithoutCreatedByInput> | CampaignSessionCreateWithoutCreatedByInput[] | CampaignSessionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignSessionCreateOrConnectWithoutCreatedByInput | CampaignSessionCreateOrConnectWithoutCreatedByInput[]
    createMany?: CampaignSessionCreateManyCreatedByInputEnvelope
    connect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
  }

  export type CharacterPermissionCreateNestedManyWithoutUserInput = {
    create?: XOR<CharacterPermissionCreateWithoutUserInput, CharacterPermissionUncheckedCreateWithoutUserInput> | CharacterPermissionCreateWithoutUserInput[] | CharacterPermissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CharacterPermissionCreateOrConnectWithoutUserInput | CharacterPermissionCreateOrConnectWithoutUserInput[]
    createMany?: CharacterPermissionCreateManyUserInputEnvelope
    connect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
  }

  export type UserSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput> | CampaignCreateWithoutOwnerInput[] | CampaignUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutOwnerInput | CampaignCreateOrConnectWithoutOwnerInput[]
    createMany?: CampaignCreateManyOwnerInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type CampaignMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CampaignMemberCreateWithoutUserInput, CampaignMemberUncheckedCreateWithoutUserInput> | CampaignMemberCreateWithoutUserInput[] | CampaignMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CampaignMemberCreateOrConnectWithoutUserInput | CampaignMemberCreateOrConnectWithoutUserInput[]
    createMany?: CampaignMemberCreateManyUserInputEnvelope
    connect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
  }

  export type CampaignInviteUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CampaignInviteCreateWithoutCreatedByInput, CampaignInviteUncheckedCreateWithoutCreatedByInput> | CampaignInviteCreateWithoutCreatedByInput[] | CampaignInviteUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignInviteCreateOrConnectWithoutCreatedByInput | CampaignInviteCreateOrConnectWithoutCreatedByInput[]
    createMany?: CampaignInviteCreateManyCreatedByInputEnvelope
    connect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
  }

  export type CampaignSessionUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CampaignSessionCreateWithoutCreatedByInput, CampaignSessionUncheckedCreateWithoutCreatedByInput> | CampaignSessionCreateWithoutCreatedByInput[] | CampaignSessionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignSessionCreateOrConnectWithoutCreatedByInput | CampaignSessionCreateOrConnectWithoutCreatedByInput[]
    createMany?: CampaignSessionCreateManyCreatedByInputEnvelope
    connect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
  }

  export type CharacterPermissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CharacterPermissionCreateWithoutUserInput, CharacterPermissionUncheckedCreateWithoutUserInput> | CharacterPermissionCreateWithoutUserInput[] | CharacterPermissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CharacterPermissionCreateOrConnectWithoutUserInput | CharacterPermissionCreateOrConnectWithoutUserInput[]
    createMany?: CharacterPermissionCreateManyUserInputEnvelope
    connect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type CampaignUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput> | CampaignCreateWithoutOwnerInput[] | CampaignUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutOwnerInput | CampaignCreateOrConnectWithoutOwnerInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutOwnerInput | CampaignUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CampaignCreateManyOwnerInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutOwnerInput | CampaignUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutOwnerInput | CampaignUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type CampaignMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<CampaignMemberCreateWithoutUserInput, CampaignMemberUncheckedCreateWithoutUserInput> | CampaignMemberCreateWithoutUserInput[] | CampaignMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CampaignMemberCreateOrConnectWithoutUserInput | CampaignMemberCreateOrConnectWithoutUserInput[]
    upsert?: CampaignMemberUpsertWithWhereUniqueWithoutUserInput | CampaignMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CampaignMemberCreateManyUserInputEnvelope
    set?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    disconnect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    delete?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    connect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    update?: CampaignMemberUpdateWithWhereUniqueWithoutUserInput | CampaignMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CampaignMemberUpdateManyWithWhereWithoutUserInput | CampaignMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CampaignMemberScalarWhereInput | CampaignMemberScalarWhereInput[]
  }

  export type CampaignInviteUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CampaignInviteCreateWithoutCreatedByInput, CampaignInviteUncheckedCreateWithoutCreatedByInput> | CampaignInviteCreateWithoutCreatedByInput[] | CampaignInviteUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignInviteCreateOrConnectWithoutCreatedByInput | CampaignInviteCreateOrConnectWithoutCreatedByInput[]
    upsert?: CampaignInviteUpsertWithWhereUniqueWithoutCreatedByInput | CampaignInviteUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CampaignInviteCreateManyCreatedByInputEnvelope
    set?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    disconnect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    delete?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    connect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    update?: CampaignInviteUpdateWithWhereUniqueWithoutCreatedByInput | CampaignInviteUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CampaignInviteUpdateManyWithWhereWithoutCreatedByInput | CampaignInviteUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CampaignInviteScalarWhereInput | CampaignInviteScalarWhereInput[]
  }

  export type CampaignSessionUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CampaignSessionCreateWithoutCreatedByInput, CampaignSessionUncheckedCreateWithoutCreatedByInput> | CampaignSessionCreateWithoutCreatedByInput[] | CampaignSessionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignSessionCreateOrConnectWithoutCreatedByInput | CampaignSessionCreateOrConnectWithoutCreatedByInput[]
    upsert?: CampaignSessionUpsertWithWhereUniqueWithoutCreatedByInput | CampaignSessionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CampaignSessionCreateManyCreatedByInputEnvelope
    set?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    disconnect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    delete?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    connect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    update?: CampaignSessionUpdateWithWhereUniqueWithoutCreatedByInput | CampaignSessionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CampaignSessionUpdateManyWithWhereWithoutCreatedByInput | CampaignSessionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CampaignSessionScalarWhereInput | CampaignSessionScalarWhereInput[]
  }

  export type CharacterPermissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<CharacterPermissionCreateWithoutUserInput, CharacterPermissionUncheckedCreateWithoutUserInput> | CharacterPermissionCreateWithoutUserInput[] | CharacterPermissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CharacterPermissionCreateOrConnectWithoutUserInput | CharacterPermissionCreateOrConnectWithoutUserInput[]
    upsert?: CharacterPermissionUpsertWithWhereUniqueWithoutUserInput | CharacterPermissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CharacterPermissionCreateManyUserInputEnvelope
    set?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    disconnect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    delete?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    connect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    update?: CharacterPermissionUpdateWithWhereUniqueWithoutUserInput | CharacterPermissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CharacterPermissionUpdateManyWithWhereWithoutUserInput | CharacterPermissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CharacterPermissionScalarWhereInput | CharacterPermissionScalarWhereInput[]
  }

  export type UserSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput> | CampaignCreateWithoutOwnerInput[] | CampaignUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutOwnerInput | CampaignCreateOrConnectWithoutOwnerInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutOwnerInput | CampaignUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CampaignCreateManyOwnerInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutOwnerInput | CampaignUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutOwnerInput | CampaignUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type CampaignMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CampaignMemberCreateWithoutUserInput, CampaignMemberUncheckedCreateWithoutUserInput> | CampaignMemberCreateWithoutUserInput[] | CampaignMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CampaignMemberCreateOrConnectWithoutUserInput | CampaignMemberCreateOrConnectWithoutUserInput[]
    upsert?: CampaignMemberUpsertWithWhereUniqueWithoutUserInput | CampaignMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CampaignMemberCreateManyUserInputEnvelope
    set?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    disconnect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    delete?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    connect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    update?: CampaignMemberUpdateWithWhereUniqueWithoutUserInput | CampaignMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CampaignMemberUpdateManyWithWhereWithoutUserInput | CampaignMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CampaignMemberScalarWhereInput | CampaignMemberScalarWhereInput[]
  }

  export type CampaignInviteUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CampaignInviteCreateWithoutCreatedByInput, CampaignInviteUncheckedCreateWithoutCreatedByInput> | CampaignInviteCreateWithoutCreatedByInput[] | CampaignInviteUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignInviteCreateOrConnectWithoutCreatedByInput | CampaignInviteCreateOrConnectWithoutCreatedByInput[]
    upsert?: CampaignInviteUpsertWithWhereUniqueWithoutCreatedByInput | CampaignInviteUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CampaignInviteCreateManyCreatedByInputEnvelope
    set?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    disconnect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    delete?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    connect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    update?: CampaignInviteUpdateWithWhereUniqueWithoutCreatedByInput | CampaignInviteUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CampaignInviteUpdateManyWithWhereWithoutCreatedByInput | CampaignInviteUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CampaignInviteScalarWhereInput | CampaignInviteScalarWhereInput[]
  }

  export type CampaignSessionUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CampaignSessionCreateWithoutCreatedByInput, CampaignSessionUncheckedCreateWithoutCreatedByInput> | CampaignSessionCreateWithoutCreatedByInput[] | CampaignSessionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CampaignSessionCreateOrConnectWithoutCreatedByInput | CampaignSessionCreateOrConnectWithoutCreatedByInput[]
    upsert?: CampaignSessionUpsertWithWhereUniqueWithoutCreatedByInput | CampaignSessionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CampaignSessionCreateManyCreatedByInputEnvelope
    set?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    disconnect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    delete?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    connect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    update?: CampaignSessionUpdateWithWhereUniqueWithoutCreatedByInput | CampaignSessionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CampaignSessionUpdateManyWithWhereWithoutCreatedByInput | CampaignSessionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CampaignSessionScalarWhereInput | CampaignSessionScalarWhereInput[]
  }

  export type CharacterPermissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CharacterPermissionCreateWithoutUserInput, CharacterPermissionUncheckedCreateWithoutUserInput> | CharacterPermissionCreateWithoutUserInput[] | CharacterPermissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CharacterPermissionCreateOrConnectWithoutUserInput | CharacterPermissionCreateOrConnectWithoutUserInput[]
    upsert?: CharacterPermissionUpsertWithWhereUniqueWithoutUserInput | CharacterPermissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CharacterPermissionCreateManyUserInputEnvelope
    set?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    disconnect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    delete?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    connect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    update?: CharacterPermissionUpdateWithWhereUniqueWithoutUserInput | CharacterPermissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CharacterPermissionUpdateManyWithWhereWithoutUserInput | CharacterPermissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CharacterPermissionScalarWhereInput | CharacterPermissionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutOwnedCampaignsInput = {
    create?: XOR<UserCreateWithoutOwnedCampaignsInput, UserUncheckedCreateWithoutOwnedCampaignsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedCampaignsInput
    connect?: UserWhereUniqueInput
  }

  export type CampaignMemberCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignMemberCreateWithoutCampaignInput, CampaignMemberUncheckedCreateWithoutCampaignInput> | CampaignMemberCreateWithoutCampaignInput[] | CampaignMemberUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignMemberCreateOrConnectWithoutCampaignInput | CampaignMemberCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignMemberCreateManyCampaignInputEnvelope
    connect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
  }

  export type CampaignInviteCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignInviteCreateWithoutCampaignInput, CampaignInviteUncheckedCreateWithoutCampaignInput> | CampaignInviteCreateWithoutCampaignInput[] | CampaignInviteUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignInviteCreateOrConnectWithoutCampaignInput | CampaignInviteCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignInviteCreateManyCampaignInputEnvelope
    connect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
  }

  export type CampaignSessionCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignSessionCreateWithoutCampaignInput, CampaignSessionUncheckedCreateWithoutCampaignInput> | CampaignSessionCreateWithoutCampaignInput[] | CampaignSessionUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignSessionCreateOrConnectWithoutCampaignInput | CampaignSessionCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignSessionCreateManyCampaignInputEnvelope
    connect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
  }

  export type MapCreateNestedManyWithoutCampaignInput = {
    create?: XOR<MapCreateWithoutCampaignInput, MapUncheckedCreateWithoutCampaignInput> | MapCreateWithoutCampaignInput[] | MapUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: MapCreateOrConnectWithoutCampaignInput | MapCreateOrConnectWithoutCampaignInput[]
    createMany?: MapCreateManyCampaignInputEnvelope
    connect?: MapWhereUniqueInput | MapWhereUniqueInput[]
  }

  export type CharacterCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CharacterCreateWithoutCampaignInput, CharacterUncheckedCreateWithoutCampaignInput> | CharacterCreateWithoutCampaignInput[] | CharacterUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CharacterCreateOrConnectWithoutCampaignInput | CharacterCreateOrConnectWithoutCampaignInput[]
    createMany?: CharacterCreateManyCampaignInputEnvelope
    connect?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
  }

  export type CampaignMemberUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignMemberCreateWithoutCampaignInput, CampaignMemberUncheckedCreateWithoutCampaignInput> | CampaignMemberCreateWithoutCampaignInput[] | CampaignMemberUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignMemberCreateOrConnectWithoutCampaignInput | CampaignMemberCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignMemberCreateManyCampaignInputEnvelope
    connect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
  }

  export type CampaignInviteUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignInviteCreateWithoutCampaignInput, CampaignInviteUncheckedCreateWithoutCampaignInput> | CampaignInviteCreateWithoutCampaignInput[] | CampaignInviteUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignInviteCreateOrConnectWithoutCampaignInput | CampaignInviteCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignInviteCreateManyCampaignInputEnvelope
    connect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
  }

  export type CampaignSessionUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignSessionCreateWithoutCampaignInput, CampaignSessionUncheckedCreateWithoutCampaignInput> | CampaignSessionCreateWithoutCampaignInput[] | CampaignSessionUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignSessionCreateOrConnectWithoutCampaignInput | CampaignSessionCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignSessionCreateManyCampaignInputEnvelope
    connect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
  }

  export type MapUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<MapCreateWithoutCampaignInput, MapUncheckedCreateWithoutCampaignInput> | MapCreateWithoutCampaignInput[] | MapUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: MapCreateOrConnectWithoutCampaignInput | MapCreateOrConnectWithoutCampaignInput[]
    createMany?: MapCreateManyCampaignInputEnvelope
    connect?: MapWhereUniqueInput | MapWhereUniqueInput[]
  }

  export type CharacterUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CharacterCreateWithoutCampaignInput, CharacterUncheckedCreateWithoutCampaignInput> | CharacterCreateWithoutCampaignInput[] | CharacterUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CharacterCreateOrConnectWithoutCampaignInput | CharacterCreateOrConnectWithoutCampaignInput[]
    createMany?: CharacterCreateManyCampaignInputEnvelope
    connect?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOwnedCampaignsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedCampaignsInput, UserUncheckedCreateWithoutOwnedCampaignsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedCampaignsInput
    upsert?: UserUpsertWithoutOwnedCampaignsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedCampaignsInput, UserUpdateWithoutOwnedCampaignsInput>, UserUncheckedUpdateWithoutOwnedCampaignsInput>
  }

  export type CampaignMemberUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignMemberCreateWithoutCampaignInput, CampaignMemberUncheckedCreateWithoutCampaignInput> | CampaignMemberCreateWithoutCampaignInput[] | CampaignMemberUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignMemberCreateOrConnectWithoutCampaignInput | CampaignMemberCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignMemberUpsertWithWhereUniqueWithoutCampaignInput | CampaignMemberUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignMemberCreateManyCampaignInputEnvelope
    set?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    disconnect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    delete?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    connect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    update?: CampaignMemberUpdateWithWhereUniqueWithoutCampaignInput | CampaignMemberUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignMemberUpdateManyWithWhereWithoutCampaignInput | CampaignMemberUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignMemberScalarWhereInput | CampaignMemberScalarWhereInput[]
  }

  export type CampaignInviteUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignInviteCreateWithoutCampaignInput, CampaignInviteUncheckedCreateWithoutCampaignInput> | CampaignInviteCreateWithoutCampaignInput[] | CampaignInviteUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignInviteCreateOrConnectWithoutCampaignInput | CampaignInviteCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignInviteUpsertWithWhereUniqueWithoutCampaignInput | CampaignInviteUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignInviteCreateManyCampaignInputEnvelope
    set?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    disconnect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    delete?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    connect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    update?: CampaignInviteUpdateWithWhereUniqueWithoutCampaignInput | CampaignInviteUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignInviteUpdateManyWithWhereWithoutCampaignInput | CampaignInviteUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignInviteScalarWhereInput | CampaignInviteScalarWhereInput[]
  }

  export type CampaignSessionUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignSessionCreateWithoutCampaignInput, CampaignSessionUncheckedCreateWithoutCampaignInput> | CampaignSessionCreateWithoutCampaignInput[] | CampaignSessionUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignSessionCreateOrConnectWithoutCampaignInput | CampaignSessionCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignSessionUpsertWithWhereUniqueWithoutCampaignInput | CampaignSessionUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignSessionCreateManyCampaignInputEnvelope
    set?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    disconnect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    delete?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    connect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    update?: CampaignSessionUpdateWithWhereUniqueWithoutCampaignInput | CampaignSessionUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignSessionUpdateManyWithWhereWithoutCampaignInput | CampaignSessionUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignSessionScalarWhereInput | CampaignSessionScalarWhereInput[]
  }

  export type MapUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<MapCreateWithoutCampaignInput, MapUncheckedCreateWithoutCampaignInput> | MapCreateWithoutCampaignInput[] | MapUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: MapCreateOrConnectWithoutCampaignInput | MapCreateOrConnectWithoutCampaignInput[]
    upsert?: MapUpsertWithWhereUniqueWithoutCampaignInput | MapUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: MapCreateManyCampaignInputEnvelope
    set?: MapWhereUniqueInput | MapWhereUniqueInput[]
    disconnect?: MapWhereUniqueInput | MapWhereUniqueInput[]
    delete?: MapWhereUniqueInput | MapWhereUniqueInput[]
    connect?: MapWhereUniqueInput | MapWhereUniqueInput[]
    update?: MapUpdateWithWhereUniqueWithoutCampaignInput | MapUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: MapUpdateManyWithWhereWithoutCampaignInput | MapUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: MapScalarWhereInput | MapScalarWhereInput[]
  }

  export type CharacterUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CharacterCreateWithoutCampaignInput, CharacterUncheckedCreateWithoutCampaignInput> | CharacterCreateWithoutCampaignInput[] | CharacterUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CharacterCreateOrConnectWithoutCampaignInput | CharacterCreateOrConnectWithoutCampaignInput[]
    upsert?: CharacterUpsertWithWhereUniqueWithoutCampaignInput | CharacterUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CharacterCreateManyCampaignInputEnvelope
    set?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
    disconnect?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
    delete?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
    connect?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
    update?: CharacterUpdateWithWhereUniqueWithoutCampaignInput | CharacterUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CharacterUpdateManyWithWhereWithoutCampaignInput | CharacterUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CharacterScalarWhereInput | CharacterScalarWhereInput[]
  }

  export type CampaignMemberUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignMemberCreateWithoutCampaignInput, CampaignMemberUncheckedCreateWithoutCampaignInput> | CampaignMemberCreateWithoutCampaignInput[] | CampaignMemberUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignMemberCreateOrConnectWithoutCampaignInput | CampaignMemberCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignMemberUpsertWithWhereUniqueWithoutCampaignInput | CampaignMemberUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignMemberCreateManyCampaignInputEnvelope
    set?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    disconnect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    delete?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    connect?: CampaignMemberWhereUniqueInput | CampaignMemberWhereUniqueInput[]
    update?: CampaignMemberUpdateWithWhereUniqueWithoutCampaignInput | CampaignMemberUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignMemberUpdateManyWithWhereWithoutCampaignInput | CampaignMemberUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignMemberScalarWhereInput | CampaignMemberScalarWhereInput[]
  }

  export type CampaignInviteUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignInviteCreateWithoutCampaignInput, CampaignInviteUncheckedCreateWithoutCampaignInput> | CampaignInviteCreateWithoutCampaignInput[] | CampaignInviteUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignInviteCreateOrConnectWithoutCampaignInput | CampaignInviteCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignInviteUpsertWithWhereUniqueWithoutCampaignInput | CampaignInviteUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignInviteCreateManyCampaignInputEnvelope
    set?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    disconnect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    delete?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    connect?: CampaignInviteWhereUniqueInput | CampaignInviteWhereUniqueInput[]
    update?: CampaignInviteUpdateWithWhereUniqueWithoutCampaignInput | CampaignInviteUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignInviteUpdateManyWithWhereWithoutCampaignInput | CampaignInviteUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignInviteScalarWhereInput | CampaignInviteScalarWhereInput[]
  }

  export type CampaignSessionUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignSessionCreateWithoutCampaignInput, CampaignSessionUncheckedCreateWithoutCampaignInput> | CampaignSessionCreateWithoutCampaignInput[] | CampaignSessionUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignSessionCreateOrConnectWithoutCampaignInput | CampaignSessionCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignSessionUpsertWithWhereUniqueWithoutCampaignInput | CampaignSessionUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignSessionCreateManyCampaignInputEnvelope
    set?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    disconnect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    delete?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    connect?: CampaignSessionWhereUniqueInput | CampaignSessionWhereUniqueInput[]
    update?: CampaignSessionUpdateWithWhereUniqueWithoutCampaignInput | CampaignSessionUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignSessionUpdateManyWithWhereWithoutCampaignInput | CampaignSessionUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignSessionScalarWhereInput | CampaignSessionScalarWhereInput[]
  }

  export type MapUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<MapCreateWithoutCampaignInput, MapUncheckedCreateWithoutCampaignInput> | MapCreateWithoutCampaignInput[] | MapUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: MapCreateOrConnectWithoutCampaignInput | MapCreateOrConnectWithoutCampaignInput[]
    upsert?: MapUpsertWithWhereUniqueWithoutCampaignInput | MapUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: MapCreateManyCampaignInputEnvelope
    set?: MapWhereUniqueInput | MapWhereUniqueInput[]
    disconnect?: MapWhereUniqueInput | MapWhereUniqueInput[]
    delete?: MapWhereUniqueInput | MapWhereUniqueInput[]
    connect?: MapWhereUniqueInput | MapWhereUniqueInput[]
    update?: MapUpdateWithWhereUniqueWithoutCampaignInput | MapUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: MapUpdateManyWithWhereWithoutCampaignInput | MapUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: MapScalarWhereInput | MapScalarWhereInput[]
  }

  export type CharacterUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CharacterCreateWithoutCampaignInput, CharacterUncheckedCreateWithoutCampaignInput> | CharacterCreateWithoutCampaignInput[] | CharacterUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CharacterCreateOrConnectWithoutCampaignInput | CharacterCreateOrConnectWithoutCampaignInput[]
    upsert?: CharacterUpsertWithWhereUniqueWithoutCampaignInput | CharacterUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CharacterCreateManyCampaignInputEnvelope
    set?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
    disconnect?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
    delete?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
    connect?: CharacterWhereUniqueInput | CharacterWhereUniqueInput[]
    update?: CharacterUpdateWithWhereUniqueWithoutCampaignInput | CharacterUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CharacterUpdateManyWithWhereWithoutCampaignInput | CharacterUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CharacterScalarWhereInput | CharacterScalarWhereInput[]
  }

  export type CampaignCreateNestedOneWithoutMembersInput = {
    create?: XOR<CampaignCreateWithoutMembersInput, CampaignUncheckedCreateWithoutMembersInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutMembersInput
    connect?: CampaignWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCampaignMembersInput = {
    create?: XOR<UserCreateWithoutCampaignMembersInput, UserUncheckedCreateWithoutCampaignMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignMembersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumCampaignRoleFieldUpdateOperationsInput = {
    set?: $Enums.CampaignRole
  }

  export type CampaignUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<CampaignCreateWithoutMembersInput, CampaignUncheckedCreateWithoutMembersInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutMembersInput
    upsert?: CampaignUpsertWithoutMembersInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutMembersInput, CampaignUpdateWithoutMembersInput>, CampaignUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutCampaignMembersNestedInput = {
    create?: XOR<UserCreateWithoutCampaignMembersInput, UserUncheckedCreateWithoutCampaignMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCampaignMembersInput
    upsert?: UserUpsertWithoutCampaignMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCampaignMembersInput, UserUpdateWithoutCampaignMembersInput>, UserUncheckedUpdateWithoutCampaignMembersInput>
  }

  export type CampaignCreateNestedOneWithoutInvitesInput = {
    create?: XOR<CampaignCreateWithoutInvitesInput, CampaignUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutInvitesInput
    connect?: CampaignWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedCampaignInvitesInput = {
    create?: XOR<UserCreateWithoutCreatedCampaignInvitesInput, UserUncheckedCreateWithoutCreatedCampaignInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCampaignInvitesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CampaignUpdateOneRequiredWithoutInvitesNestedInput = {
    create?: XOR<CampaignCreateWithoutInvitesInput, CampaignUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutInvitesInput
    upsert?: CampaignUpsertWithoutInvitesInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutInvitesInput, CampaignUpdateWithoutInvitesInput>, CampaignUncheckedUpdateWithoutInvitesInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedCampaignInvitesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedCampaignInvitesInput, UserUncheckedCreateWithoutCreatedCampaignInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCampaignInvitesInput
    upsert?: UserUpsertWithoutCreatedCampaignInvitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedCampaignInvitesInput, UserUpdateWithoutCreatedCampaignInvitesInput>, UserUncheckedUpdateWithoutCreatedCampaignInvitesInput>
  }

  export type CampaignCreateNestedOneWithoutSessionsInput = {
    create?: XOR<CampaignCreateWithoutSessionsInput, CampaignUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutSessionsInput
    connect?: CampaignWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedCampaignSessionsInput = {
    create?: XOR<UserCreateWithoutCreatedCampaignSessionsInput, UserUncheckedCreateWithoutCreatedCampaignSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCampaignSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumCampaignSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.CampaignSessionStatus
  }

  export type CampaignUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<CampaignCreateWithoutSessionsInput, CampaignUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutSessionsInput
    upsert?: CampaignUpsertWithoutSessionsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutSessionsInput, CampaignUpdateWithoutSessionsInput>, CampaignUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedCampaignSessionsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedCampaignSessionsInput, UserUncheckedCreateWithoutCreatedCampaignSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCampaignSessionsInput
    upsert?: UserUpsertWithoutCreatedCampaignSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedCampaignSessionsInput, UserUpdateWithoutCreatedCampaignSessionsInput>, UserUncheckedUpdateWithoutCreatedCampaignSessionsInput>
  }

  export type CampaignCreateNestedOneWithoutMapsInput = {
    create?: XOR<CampaignCreateWithoutMapsInput, CampaignUncheckedCreateWithoutMapsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutMapsInput
    connect?: CampaignWhereUniqueInput
  }

  export type MapTokenCreateNestedManyWithoutMapInput = {
    create?: XOR<MapTokenCreateWithoutMapInput, MapTokenUncheckedCreateWithoutMapInput> | MapTokenCreateWithoutMapInput[] | MapTokenUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapTokenCreateOrConnectWithoutMapInput | MapTokenCreateOrConnectWithoutMapInput[]
    createMany?: MapTokenCreateManyMapInputEnvelope
    connect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
  }

  export type MapTokenUncheckedCreateNestedManyWithoutMapInput = {
    create?: XOR<MapTokenCreateWithoutMapInput, MapTokenUncheckedCreateWithoutMapInput> | MapTokenCreateWithoutMapInput[] | MapTokenUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapTokenCreateOrConnectWithoutMapInput | MapTokenCreateOrConnectWithoutMapInput[]
    createMany?: MapTokenCreateManyMapInputEnvelope
    connect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
  }

  export type EnumGridTypeFieldUpdateOperationsInput = {
    set?: $Enums.GridType
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CampaignUpdateOneRequiredWithoutMapsNestedInput = {
    create?: XOR<CampaignCreateWithoutMapsInput, CampaignUncheckedCreateWithoutMapsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutMapsInput
    upsert?: CampaignUpsertWithoutMapsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutMapsInput, CampaignUpdateWithoutMapsInput>, CampaignUncheckedUpdateWithoutMapsInput>
  }

  export type MapTokenUpdateManyWithoutMapNestedInput = {
    create?: XOR<MapTokenCreateWithoutMapInput, MapTokenUncheckedCreateWithoutMapInput> | MapTokenCreateWithoutMapInput[] | MapTokenUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapTokenCreateOrConnectWithoutMapInput | MapTokenCreateOrConnectWithoutMapInput[]
    upsert?: MapTokenUpsertWithWhereUniqueWithoutMapInput | MapTokenUpsertWithWhereUniqueWithoutMapInput[]
    createMany?: MapTokenCreateManyMapInputEnvelope
    set?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    disconnect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    delete?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    connect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    update?: MapTokenUpdateWithWhereUniqueWithoutMapInput | MapTokenUpdateWithWhereUniqueWithoutMapInput[]
    updateMany?: MapTokenUpdateManyWithWhereWithoutMapInput | MapTokenUpdateManyWithWhereWithoutMapInput[]
    deleteMany?: MapTokenScalarWhereInput | MapTokenScalarWhereInput[]
  }

  export type MapTokenUncheckedUpdateManyWithoutMapNestedInput = {
    create?: XOR<MapTokenCreateWithoutMapInput, MapTokenUncheckedCreateWithoutMapInput> | MapTokenCreateWithoutMapInput[] | MapTokenUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapTokenCreateOrConnectWithoutMapInput | MapTokenCreateOrConnectWithoutMapInput[]
    upsert?: MapTokenUpsertWithWhereUniqueWithoutMapInput | MapTokenUpsertWithWhereUniqueWithoutMapInput[]
    createMany?: MapTokenCreateManyMapInputEnvelope
    set?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    disconnect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    delete?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    connect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    update?: MapTokenUpdateWithWhereUniqueWithoutMapInput | MapTokenUpdateWithWhereUniqueWithoutMapInput[]
    updateMany?: MapTokenUpdateManyWithWhereWithoutMapInput | MapTokenUpdateManyWithWhereWithoutMapInput[]
    deleteMany?: MapTokenScalarWhereInput | MapTokenScalarWhereInput[]
  }

  export type MapCreateNestedOneWithoutTokensInput = {
    create?: XOR<MapCreateWithoutTokensInput, MapUncheckedCreateWithoutTokensInput>
    connectOrCreate?: MapCreateOrConnectWithoutTokensInput
    connect?: MapWhereUniqueInput
  }

  export type CharacterCreateNestedOneWithoutTokensInput = {
    create?: XOR<CharacterCreateWithoutTokensInput, CharacterUncheckedCreateWithoutTokensInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutTokensInput
    connect?: CharacterWhereUniqueInput
  }

  export type EnumTokenVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.TokenVisibility
  }

  export type EnumTokenDispositionFieldUpdateOperationsInput = {
    set?: $Enums.TokenDisposition
  }

  export type MapUpdateOneRequiredWithoutTokensNestedInput = {
    create?: XOR<MapCreateWithoutTokensInput, MapUncheckedCreateWithoutTokensInput>
    connectOrCreate?: MapCreateOrConnectWithoutTokensInput
    upsert?: MapUpsertWithoutTokensInput
    connect?: MapWhereUniqueInput
    update?: XOR<XOR<MapUpdateToOneWithWhereWithoutTokensInput, MapUpdateWithoutTokensInput>, MapUncheckedUpdateWithoutTokensInput>
  }

  export type CharacterUpdateOneWithoutTokensNestedInput = {
    create?: XOR<CharacterCreateWithoutTokensInput, CharacterUncheckedCreateWithoutTokensInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutTokensInput
    upsert?: CharacterUpsertWithoutTokensInput
    disconnect?: CharacterWhereInput | boolean
    delete?: CharacterWhereInput | boolean
    connect?: CharacterWhereUniqueInput
    update?: XOR<XOR<CharacterUpdateToOneWithWhereWithoutTokensInput, CharacterUpdateWithoutTokensInput>, CharacterUncheckedUpdateWithoutTokensInput>
  }

  export type CampaignCreateNestedOneWithoutCharactersInput = {
    create?: XOR<CampaignCreateWithoutCharactersInput, CampaignUncheckedCreateWithoutCharactersInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutCharactersInput
    connect?: CampaignWhereUniqueInput
  }

  export type CharacterSheetCreateNestedOneWithoutCharacterInput = {
    create?: XOR<CharacterSheetCreateWithoutCharacterInput, CharacterSheetUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: CharacterSheetCreateOrConnectWithoutCharacterInput
    connect?: CharacterSheetWhereUniqueInput
  }

  export type CharacterPermissionCreateNestedManyWithoutCharacterInput = {
    create?: XOR<CharacterPermissionCreateWithoutCharacterInput, CharacterPermissionUncheckedCreateWithoutCharacterInput> | CharacterPermissionCreateWithoutCharacterInput[] | CharacterPermissionUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: CharacterPermissionCreateOrConnectWithoutCharacterInput | CharacterPermissionCreateOrConnectWithoutCharacterInput[]
    createMany?: CharacterPermissionCreateManyCharacterInputEnvelope
    connect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
  }

  export type MapTokenCreateNestedManyWithoutCharacterInput = {
    create?: XOR<MapTokenCreateWithoutCharacterInput, MapTokenUncheckedCreateWithoutCharacterInput> | MapTokenCreateWithoutCharacterInput[] | MapTokenUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: MapTokenCreateOrConnectWithoutCharacterInput | MapTokenCreateOrConnectWithoutCharacterInput[]
    createMany?: MapTokenCreateManyCharacterInputEnvelope
    connect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
  }

  export type CharacterSheetUncheckedCreateNestedOneWithoutCharacterInput = {
    create?: XOR<CharacterSheetCreateWithoutCharacterInput, CharacterSheetUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: CharacterSheetCreateOrConnectWithoutCharacterInput
    connect?: CharacterSheetWhereUniqueInput
  }

  export type CharacterPermissionUncheckedCreateNestedManyWithoutCharacterInput = {
    create?: XOR<CharacterPermissionCreateWithoutCharacterInput, CharacterPermissionUncheckedCreateWithoutCharacterInput> | CharacterPermissionCreateWithoutCharacterInput[] | CharacterPermissionUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: CharacterPermissionCreateOrConnectWithoutCharacterInput | CharacterPermissionCreateOrConnectWithoutCharacterInput[]
    createMany?: CharacterPermissionCreateManyCharacterInputEnvelope
    connect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
  }

  export type MapTokenUncheckedCreateNestedManyWithoutCharacterInput = {
    create?: XOR<MapTokenCreateWithoutCharacterInput, MapTokenUncheckedCreateWithoutCharacterInput> | MapTokenCreateWithoutCharacterInput[] | MapTokenUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: MapTokenCreateOrConnectWithoutCharacterInput | MapTokenCreateOrConnectWithoutCharacterInput[]
    createMany?: MapTokenCreateManyCharacterInputEnvelope
    connect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
  }

  export type EnumCharacterTypeFieldUpdateOperationsInput = {
    set?: $Enums.CharacterType
  }

  export type EnumCharacterVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.CharacterVisibility
  }

  export type CampaignUpdateOneRequiredWithoutCharactersNestedInput = {
    create?: XOR<CampaignCreateWithoutCharactersInput, CampaignUncheckedCreateWithoutCharactersInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutCharactersInput
    upsert?: CampaignUpsertWithoutCharactersInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutCharactersInput, CampaignUpdateWithoutCharactersInput>, CampaignUncheckedUpdateWithoutCharactersInput>
  }

  export type CharacterSheetUpdateOneWithoutCharacterNestedInput = {
    create?: XOR<CharacterSheetCreateWithoutCharacterInput, CharacterSheetUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: CharacterSheetCreateOrConnectWithoutCharacterInput
    upsert?: CharacterSheetUpsertWithoutCharacterInput
    disconnect?: CharacterSheetWhereInput | boolean
    delete?: CharacterSheetWhereInput | boolean
    connect?: CharacterSheetWhereUniqueInput
    update?: XOR<XOR<CharacterSheetUpdateToOneWithWhereWithoutCharacterInput, CharacterSheetUpdateWithoutCharacterInput>, CharacterSheetUncheckedUpdateWithoutCharacterInput>
  }

  export type CharacterPermissionUpdateManyWithoutCharacterNestedInput = {
    create?: XOR<CharacterPermissionCreateWithoutCharacterInput, CharacterPermissionUncheckedCreateWithoutCharacterInput> | CharacterPermissionCreateWithoutCharacterInput[] | CharacterPermissionUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: CharacterPermissionCreateOrConnectWithoutCharacterInput | CharacterPermissionCreateOrConnectWithoutCharacterInput[]
    upsert?: CharacterPermissionUpsertWithWhereUniqueWithoutCharacterInput | CharacterPermissionUpsertWithWhereUniqueWithoutCharacterInput[]
    createMany?: CharacterPermissionCreateManyCharacterInputEnvelope
    set?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    disconnect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    delete?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    connect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    update?: CharacterPermissionUpdateWithWhereUniqueWithoutCharacterInput | CharacterPermissionUpdateWithWhereUniqueWithoutCharacterInput[]
    updateMany?: CharacterPermissionUpdateManyWithWhereWithoutCharacterInput | CharacterPermissionUpdateManyWithWhereWithoutCharacterInput[]
    deleteMany?: CharacterPermissionScalarWhereInput | CharacterPermissionScalarWhereInput[]
  }

  export type MapTokenUpdateManyWithoutCharacterNestedInput = {
    create?: XOR<MapTokenCreateWithoutCharacterInput, MapTokenUncheckedCreateWithoutCharacterInput> | MapTokenCreateWithoutCharacterInput[] | MapTokenUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: MapTokenCreateOrConnectWithoutCharacterInput | MapTokenCreateOrConnectWithoutCharacterInput[]
    upsert?: MapTokenUpsertWithWhereUniqueWithoutCharacterInput | MapTokenUpsertWithWhereUniqueWithoutCharacterInput[]
    createMany?: MapTokenCreateManyCharacterInputEnvelope
    set?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    disconnect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    delete?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    connect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    update?: MapTokenUpdateWithWhereUniqueWithoutCharacterInput | MapTokenUpdateWithWhereUniqueWithoutCharacterInput[]
    updateMany?: MapTokenUpdateManyWithWhereWithoutCharacterInput | MapTokenUpdateManyWithWhereWithoutCharacterInput[]
    deleteMany?: MapTokenScalarWhereInput | MapTokenScalarWhereInput[]
  }

  export type CharacterSheetUncheckedUpdateOneWithoutCharacterNestedInput = {
    create?: XOR<CharacterSheetCreateWithoutCharacterInput, CharacterSheetUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: CharacterSheetCreateOrConnectWithoutCharacterInput
    upsert?: CharacterSheetUpsertWithoutCharacterInput
    disconnect?: CharacterSheetWhereInput | boolean
    delete?: CharacterSheetWhereInput | boolean
    connect?: CharacterSheetWhereUniqueInput
    update?: XOR<XOR<CharacterSheetUpdateToOneWithWhereWithoutCharacterInput, CharacterSheetUpdateWithoutCharacterInput>, CharacterSheetUncheckedUpdateWithoutCharacterInput>
  }

  export type CharacterPermissionUncheckedUpdateManyWithoutCharacterNestedInput = {
    create?: XOR<CharacterPermissionCreateWithoutCharacterInput, CharacterPermissionUncheckedCreateWithoutCharacterInput> | CharacterPermissionCreateWithoutCharacterInput[] | CharacterPermissionUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: CharacterPermissionCreateOrConnectWithoutCharacterInput | CharacterPermissionCreateOrConnectWithoutCharacterInput[]
    upsert?: CharacterPermissionUpsertWithWhereUniqueWithoutCharacterInput | CharacterPermissionUpsertWithWhereUniqueWithoutCharacterInput[]
    createMany?: CharacterPermissionCreateManyCharacterInputEnvelope
    set?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    disconnect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    delete?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    connect?: CharacterPermissionWhereUniqueInput | CharacterPermissionWhereUniqueInput[]
    update?: CharacterPermissionUpdateWithWhereUniqueWithoutCharacterInput | CharacterPermissionUpdateWithWhereUniqueWithoutCharacterInput[]
    updateMany?: CharacterPermissionUpdateManyWithWhereWithoutCharacterInput | CharacterPermissionUpdateManyWithWhereWithoutCharacterInput[]
    deleteMany?: CharacterPermissionScalarWhereInput | CharacterPermissionScalarWhereInput[]
  }

  export type MapTokenUncheckedUpdateManyWithoutCharacterNestedInput = {
    create?: XOR<MapTokenCreateWithoutCharacterInput, MapTokenUncheckedCreateWithoutCharacterInput> | MapTokenCreateWithoutCharacterInput[] | MapTokenUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: MapTokenCreateOrConnectWithoutCharacterInput | MapTokenCreateOrConnectWithoutCharacterInput[]
    upsert?: MapTokenUpsertWithWhereUniqueWithoutCharacterInput | MapTokenUpsertWithWhereUniqueWithoutCharacterInput[]
    createMany?: MapTokenCreateManyCharacterInputEnvelope
    set?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    disconnect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    delete?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    connect?: MapTokenWhereUniqueInput | MapTokenWhereUniqueInput[]
    update?: MapTokenUpdateWithWhereUniqueWithoutCharacterInput | MapTokenUpdateWithWhereUniqueWithoutCharacterInput[]
    updateMany?: MapTokenUpdateManyWithWhereWithoutCharacterInput | MapTokenUpdateManyWithWhereWithoutCharacterInput[]
    deleteMany?: MapTokenScalarWhereInput | MapTokenScalarWhereInput[]
  }

  export type CharacterCreateNestedOneWithoutSheetInput = {
    create?: XOR<CharacterCreateWithoutSheetInput, CharacterUncheckedCreateWithoutSheetInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutSheetInput
    connect?: CharacterWhereUniqueInput
  }

  export type CharacterUpdateOneRequiredWithoutSheetNestedInput = {
    create?: XOR<CharacterCreateWithoutSheetInput, CharacterUncheckedCreateWithoutSheetInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutSheetInput
    upsert?: CharacterUpsertWithoutSheetInput
    connect?: CharacterWhereUniqueInput
    update?: XOR<XOR<CharacterUpdateToOneWithWhereWithoutSheetInput, CharacterUpdateWithoutSheetInput>, CharacterUncheckedUpdateWithoutSheetInput>
  }

  export type CharacterCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<CharacterCreateWithoutPermissionsInput, CharacterUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutPermissionsInput
    connect?: CharacterWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCharacterPermissionsInput = {
    create?: XOR<UserCreateWithoutCharacterPermissionsInput, UserUncheckedCreateWithoutCharacterPermissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCharacterPermissionsInput
    connect?: UserWhereUniqueInput
  }

  export type CharacterUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<CharacterCreateWithoutPermissionsInput, CharacterUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutPermissionsInput
    upsert?: CharacterUpsertWithoutPermissionsInput
    connect?: CharacterWhereUniqueInput
    update?: XOR<XOR<CharacterUpdateToOneWithWhereWithoutPermissionsInput, CharacterUpdateWithoutPermissionsInput>, CharacterUncheckedUpdateWithoutPermissionsInput>
  }

  export type UserUpdateOneRequiredWithoutCharacterPermissionsNestedInput = {
    create?: XOR<UserCreateWithoutCharacterPermissionsInput, UserUncheckedCreateWithoutCharacterPermissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCharacterPermissionsInput
    upsert?: UserUpsertWithoutCharacterPermissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCharacterPermissionsInput, UserUpdateWithoutCharacterPermissionsInput>, UserUncheckedUpdateWithoutCharacterPermissionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCampaignRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignRole | EnumCampaignRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignRole[] | ListEnumCampaignRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignRole[] | ListEnumCampaignRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignRoleFilter<$PrismaModel> | $Enums.CampaignRole
  }

  export type NestedEnumCampaignRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignRole | EnumCampaignRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignRole[] | ListEnumCampaignRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignRole[] | ListEnumCampaignRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignRoleWithAggregatesFilter<$PrismaModel> | $Enums.CampaignRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignRoleFilter<$PrismaModel>
    _max?: NestedEnumCampaignRoleFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumCampaignSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignSessionStatus | EnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignSessionStatus[] | ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignSessionStatus[] | ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignSessionStatusFilter<$PrismaModel> | $Enums.CampaignSessionStatus
  }

  export type NestedEnumCampaignSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignSessionStatus | EnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignSessionStatus[] | ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignSessionStatus[] | ListEnumCampaignSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignSessionStatusFilter<$PrismaModel>
  }

  export type NestedEnumGridTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GridType | EnumGridTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GridType[] | ListEnumGridTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GridType[] | ListEnumGridTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGridTypeFilter<$PrismaModel> | $Enums.GridType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumGridTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GridType | EnumGridTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GridType[] | ListEnumGridTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GridType[] | ListEnumGridTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGridTypeWithAggregatesFilter<$PrismaModel> | $Enums.GridType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGridTypeFilter<$PrismaModel>
    _max?: NestedEnumGridTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTokenVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenVisibility | EnumTokenVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.TokenVisibility[] | ListEnumTokenVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenVisibility[] | ListEnumTokenVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenVisibilityFilter<$PrismaModel> | $Enums.TokenVisibility
  }

  export type NestedEnumTokenDispositionFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenDisposition | EnumTokenDispositionFieldRefInput<$PrismaModel>
    in?: $Enums.TokenDisposition[] | ListEnumTokenDispositionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenDisposition[] | ListEnumTokenDispositionFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenDispositionFilter<$PrismaModel> | $Enums.TokenDisposition
  }

  export type NestedEnumTokenVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenVisibility | EnumTokenVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.TokenVisibility[] | ListEnumTokenVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenVisibility[] | ListEnumTokenVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.TokenVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenVisibilityFilter<$PrismaModel>
    _max?: NestedEnumTokenVisibilityFilter<$PrismaModel>
  }

  export type NestedEnumTokenDispositionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenDisposition | EnumTokenDispositionFieldRefInput<$PrismaModel>
    in?: $Enums.TokenDisposition[] | ListEnumTokenDispositionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenDisposition[] | ListEnumTokenDispositionFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenDispositionWithAggregatesFilter<$PrismaModel> | $Enums.TokenDisposition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenDispositionFilter<$PrismaModel>
    _max?: NestedEnumTokenDispositionFilter<$PrismaModel>
  }

  export type NestedEnumCharacterTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CharacterType | EnumCharacterTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CharacterType[] | ListEnumCharacterTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CharacterType[] | ListEnumCharacterTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCharacterTypeFilter<$PrismaModel> | $Enums.CharacterType
  }

  export type NestedEnumCharacterVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.CharacterVisibility | EnumCharacterVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.CharacterVisibility[] | ListEnumCharacterVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CharacterVisibility[] | ListEnumCharacterVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumCharacterVisibilityFilter<$PrismaModel> | $Enums.CharacterVisibility
  }

  export type NestedEnumCharacterTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CharacterType | EnumCharacterTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CharacterType[] | ListEnumCharacterTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CharacterType[] | ListEnumCharacterTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCharacterTypeWithAggregatesFilter<$PrismaModel> | $Enums.CharacterType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCharacterTypeFilter<$PrismaModel>
    _max?: NestedEnumCharacterTypeFilter<$PrismaModel>
  }

  export type NestedEnumCharacterVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CharacterVisibility | EnumCharacterVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.CharacterVisibility[] | ListEnumCharacterVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CharacterVisibility[] | ListEnumCharacterVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumCharacterVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.CharacterVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCharacterVisibilityFilter<$PrismaModel>
    _max?: NestedEnumCharacterVisibilityFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserSessionCreateWithoutUserInput = {
    id?: string
    refreshTokenHash?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserSessionUncheckedCreateWithoutUserInput = {
    id?: string
    refreshTokenHash?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserSessionCreateOrConnectWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionCreateManyUserInputEnvelope = {
    data: UserSessionCreateManyUserInput | UserSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CampaignCreateWithoutOwnerInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    members?: CampaignMemberCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionCreateNestedManyWithoutCampaignInput
    maps?: MapCreateNestedManyWithoutCampaignInput
    characters?: CharacterCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    members?: CampaignMemberUncheckedCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteUncheckedCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionUncheckedCreateNestedManyWithoutCampaignInput
    maps?: MapUncheckedCreateNestedManyWithoutCampaignInput
    characters?: CharacterUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutOwnerInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput>
  }

  export type CampaignCreateManyOwnerInputEnvelope = {
    data: CampaignCreateManyOwnerInput | CampaignCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type CampaignMemberCreateWithoutUserInput = {
    id?: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutMembersInput
  }

  export type CampaignMemberUncheckedCreateWithoutUserInput = {
    id?: string
    campaignId: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
  }

  export type CampaignMemberCreateOrConnectWithoutUserInput = {
    where: CampaignMemberWhereUniqueInput
    create: XOR<CampaignMemberCreateWithoutUserInput, CampaignMemberUncheckedCreateWithoutUserInput>
  }

  export type CampaignMemberCreateManyUserInputEnvelope = {
    data: CampaignMemberCreateManyUserInput | CampaignMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CampaignInviteCreateWithoutCreatedByInput = {
    id?: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutInvitesInput
  }

  export type CampaignInviteUncheckedCreateWithoutCreatedByInput = {
    id?: string
    campaignId: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CampaignInviteCreateOrConnectWithoutCreatedByInput = {
    where: CampaignInviteWhereUniqueInput
    create: XOR<CampaignInviteCreateWithoutCreatedByInput, CampaignInviteUncheckedCreateWithoutCreatedByInput>
  }

  export type CampaignInviteCreateManyCreatedByInputEnvelope = {
    data: CampaignInviteCreateManyCreatedByInput | CampaignInviteCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type CampaignSessionCreateWithoutCreatedByInput = {
    id?: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutSessionsInput
  }

  export type CampaignSessionUncheckedCreateWithoutCreatedByInput = {
    id?: string
    campaignId: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
  }

  export type CampaignSessionCreateOrConnectWithoutCreatedByInput = {
    where: CampaignSessionWhereUniqueInput
    create: XOR<CampaignSessionCreateWithoutCreatedByInput, CampaignSessionUncheckedCreateWithoutCreatedByInput>
  }

  export type CampaignSessionCreateManyCreatedByInputEnvelope = {
    data: CampaignSessionCreateManyCreatedByInput | CampaignSessionCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type CharacterPermissionCreateWithoutUserInput = {
    id?: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
    character: CharacterCreateNestedOneWithoutPermissionsInput
  }

  export type CharacterPermissionUncheckedCreateWithoutUserInput = {
    id?: string
    characterId: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
  }

  export type CharacterPermissionCreateOrConnectWithoutUserInput = {
    where: CharacterPermissionWhereUniqueInput
    create: XOR<CharacterPermissionCreateWithoutUserInput, CharacterPermissionUncheckedCreateWithoutUserInput>
  }

  export type CharacterPermissionCreateManyUserInputEnvelope = {
    data: CharacterPermissionCreateManyUserInput | CharacterPermissionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    update: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    data: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateManyWithWhereWithoutUserInput = {
    where: UserSessionScalarWhereInput
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSessionScalarWhereInput = {
    AND?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    OR?: UserSessionScalarWhereInput[]
    NOT?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    id?: StringFilter<"UserSession"> | string
    userId?: StringFilter<"UserSession"> | string
    refreshTokenHash?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
  }

  export type CampaignUpsertWithWhereUniqueWithoutOwnerInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutOwnerInput, CampaignUncheckedUpdateWithoutOwnerInput>
    create: XOR<CampaignCreateWithoutOwnerInput, CampaignUncheckedCreateWithoutOwnerInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutOwnerInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutOwnerInput, CampaignUncheckedUpdateWithoutOwnerInput>
  }

  export type CampaignUpdateManyWithWhereWithoutOwnerInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutOwnerInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    ownerUserId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    archivedAt?: DateTimeNullableFilter<"Campaign"> | Date | string | null
  }

  export type CampaignMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: CampaignMemberWhereUniqueInput
    update: XOR<CampaignMemberUpdateWithoutUserInput, CampaignMemberUncheckedUpdateWithoutUserInput>
    create: XOR<CampaignMemberCreateWithoutUserInput, CampaignMemberUncheckedCreateWithoutUserInput>
  }

  export type CampaignMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: CampaignMemberWhereUniqueInput
    data: XOR<CampaignMemberUpdateWithoutUserInput, CampaignMemberUncheckedUpdateWithoutUserInput>
  }

  export type CampaignMemberUpdateManyWithWhereWithoutUserInput = {
    where: CampaignMemberScalarWhereInput
    data: XOR<CampaignMemberUpdateManyMutationInput, CampaignMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type CampaignMemberScalarWhereInput = {
    AND?: CampaignMemberScalarWhereInput | CampaignMemberScalarWhereInput[]
    OR?: CampaignMemberScalarWhereInput[]
    NOT?: CampaignMemberScalarWhereInput | CampaignMemberScalarWhereInput[]
    id?: StringFilter<"CampaignMember"> | string
    campaignId?: StringFilter<"CampaignMember"> | string
    userId?: StringFilter<"CampaignMember"> | string
    role?: EnumCampaignRoleFilter<"CampaignMember"> | $Enums.CampaignRole
    displayName?: StringNullableFilter<"CampaignMember"> | string | null
    joinedAt?: DateTimeFilter<"CampaignMember"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"CampaignMember"> | Date | string | null
  }

  export type CampaignInviteUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: CampaignInviteWhereUniqueInput
    update: XOR<CampaignInviteUpdateWithoutCreatedByInput, CampaignInviteUncheckedUpdateWithoutCreatedByInput>
    create: XOR<CampaignInviteCreateWithoutCreatedByInput, CampaignInviteUncheckedCreateWithoutCreatedByInput>
  }

  export type CampaignInviteUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: CampaignInviteWhereUniqueInput
    data: XOR<CampaignInviteUpdateWithoutCreatedByInput, CampaignInviteUncheckedUpdateWithoutCreatedByInput>
  }

  export type CampaignInviteUpdateManyWithWhereWithoutCreatedByInput = {
    where: CampaignInviteScalarWhereInput
    data: XOR<CampaignInviteUpdateManyMutationInput, CampaignInviteUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type CampaignInviteScalarWhereInput = {
    AND?: CampaignInviteScalarWhereInput | CampaignInviteScalarWhereInput[]
    OR?: CampaignInviteScalarWhereInput[]
    NOT?: CampaignInviteScalarWhereInput | CampaignInviteScalarWhereInput[]
    id?: StringFilter<"CampaignInvite"> | string
    campaignId?: StringFilter<"CampaignInvite"> | string
    code?: StringFilter<"CampaignInvite"> | string
    roleOnJoin?: EnumCampaignRoleFilter<"CampaignInvite"> | $Enums.CampaignRole
    createdByUserId?: StringFilter<"CampaignInvite"> | string
    maxUses?: IntNullableFilter<"CampaignInvite"> | number | null
    usesCount?: IntFilter<"CampaignInvite"> | number
    expiresAt?: DateTimeNullableFilter<"CampaignInvite"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"CampaignInvite"> | Date | string | null
    createdAt?: DateTimeFilter<"CampaignInvite"> | Date | string
  }

  export type CampaignSessionUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: CampaignSessionWhereUniqueInput
    update: XOR<CampaignSessionUpdateWithoutCreatedByInput, CampaignSessionUncheckedUpdateWithoutCreatedByInput>
    create: XOR<CampaignSessionCreateWithoutCreatedByInput, CampaignSessionUncheckedCreateWithoutCreatedByInput>
  }

  export type CampaignSessionUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: CampaignSessionWhereUniqueInput
    data: XOR<CampaignSessionUpdateWithoutCreatedByInput, CampaignSessionUncheckedUpdateWithoutCreatedByInput>
  }

  export type CampaignSessionUpdateManyWithWhereWithoutCreatedByInput = {
    where: CampaignSessionScalarWhereInput
    data: XOR<CampaignSessionUpdateManyMutationInput, CampaignSessionUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type CampaignSessionScalarWhereInput = {
    AND?: CampaignSessionScalarWhereInput | CampaignSessionScalarWhereInput[]
    OR?: CampaignSessionScalarWhereInput[]
    NOT?: CampaignSessionScalarWhereInput | CampaignSessionScalarWhereInput[]
    id?: StringFilter<"CampaignSession"> | string
    campaignId?: StringFilter<"CampaignSession"> | string
    activeMapId?: StringNullableFilter<"CampaignSession"> | string | null
    status?: EnumCampaignSessionStatusFilter<"CampaignSession"> | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFilter<"CampaignSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"CampaignSession"> | Date | string | null
    createdByUserId?: StringFilter<"CampaignSession"> | string
  }

  export type CharacterPermissionUpsertWithWhereUniqueWithoutUserInput = {
    where: CharacterPermissionWhereUniqueInput
    update: XOR<CharacterPermissionUpdateWithoutUserInput, CharacterPermissionUncheckedUpdateWithoutUserInput>
    create: XOR<CharacterPermissionCreateWithoutUserInput, CharacterPermissionUncheckedCreateWithoutUserInput>
  }

  export type CharacterPermissionUpdateWithWhereUniqueWithoutUserInput = {
    where: CharacterPermissionWhereUniqueInput
    data: XOR<CharacterPermissionUpdateWithoutUserInput, CharacterPermissionUncheckedUpdateWithoutUserInput>
  }

  export type CharacterPermissionUpdateManyWithWhereWithoutUserInput = {
    where: CharacterPermissionScalarWhereInput
    data: XOR<CharacterPermissionUpdateManyMutationInput, CharacterPermissionUncheckedUpdateManyWithoutUserInput>
  }

  export type CharacterPermissionScalarWhereInput = {
    AND?: CharacterPermissionScalarWhereInput | CharacterPermissionScalarWhereInput[]
    OR?: CharacterPermissionScalarWhereInput[]
    NOT?: CharacterPermissionScalarWhereInput | CharacterPermissionScalarWhereInput[]
    id?: StringFilter<"CharacterPermission"> | string
    characterId?: StringFilter<"CharacterPermission"> | string
    userId?: StringFilter<"CharacterPermission"> | string
    canView?: BoolFilter<"CharacterPermission"> | boolean
    canEdit?: BoolFilter<"CharacterPermission"> | boolean
    canControl?: BoolFilter<"CharacterPermission"> | boolean
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCampaigns?: CampaignCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCampaigns?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberUncheckedCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteUncheckedCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionUncheckedCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionUncheckedCreateNestedManyWithoutUserInput
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
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCampaigns?: CampaignUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCampaigns?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUncheckedUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUncheckedUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutOwnedCampaignsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    campaignMembers?: CampaignMemberCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedCampaignsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    campaignMembers?: CampaignMemberUncheckedCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteUncheckedCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionUncheckedCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedCampaignsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedCampaignsInput, UserUncheckedCreateWithoutOwnedCampaignsInput>
  }

  export type CampaignMemberCreateWithoutCampaignInput = {
    id?: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
    user: UserCreateNestedOneWithoutCampaignMembersInput
  }

  export type CampaignMemberUncheckedCreateWithoutCampaignInput = {
    id?: string
    userId: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
  }

  export type CampaignMemberCreateOrConnectWithoutCampaignInput = {
    where: CampaignMemberWhereUniqueInput
    create: XOR<CampaignMemberCreateWithoutCampaignInput, CampaignMemberUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignMemberCreateManyCampaignInputEnvelope = {
    data: CampaignMemberCreateManyCampaignInput | CampaignMemberCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type CampaignInviteCreateWithoutCampaignInput = {
    id?: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedCampaignInvitesInput
  }

  export type CampaignInviteUncheckedCreateWithoutCampaignInput = {
    id?: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    createdByUserId: string
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CampaignInviteCreateOrConnectWithoutCampaignInput = {
    where: CampaignInviteWhereUniqueInput
    create: XOR<CampaignInviteCreateWithoutCampaignInput, CampaignInviteUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignInviteCreateManyCampaignInputEnvelope = {
    data: CampaignInviteCreateManyCampaignInput | CampaignInviteCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type CampaignSessionCreateWithoutCampaignInput = {
    id?: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdBy: UserCreateNestedOneWithoutCreatedCampaignSessionsInput
  }

  export type CampaignSessionUncheckedCreateWithoutCampaignInput = {
    id?: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdByUserId: string
  }

  export type CampaignSessionCreateOrConnectWithoutCampaignInput = {
    where: CampaignSessionWhereUniqueInput
    create: XOR<CampaignSessionCreateWithoutCampaignInput, CampaignSessionUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignSessionCreateManyCampaignInputEnvelope = {
    data: CampaignSessionCreateManyCampaignInput | CampaignSessionCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type MapCreateWithoutCampaignInput = {
    id?: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType?: $Enums.GridType
    backgroundImage?: string | null
    backgroundFitMode?: string
    backgroundOffsetX?: number
    backgroundOffsetY?: number
    backgroundScale?: number
    gridOffsetX?: number
    gridOffsetY?: number
    gridColor?: string
    gridOpacity?: number
    fogEnabled?: boolean
    fogMode?: string
    fogOpacity?: number
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: number
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    tokens?: MapTokenCreateNestedManyWithoutMapInput
  }

  export type MapUncheckedCreateWithoutCampaignInput = {
    id?: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType?: $Enums.GridType
    backgroundImage?: string | null
    backgroundFitMode?: string
    backgroundOffsetX?: number
    backgroundOffsetY?: number
    backgroundScale?: number
    gridOffsetX?: number
    gridOffsetY?: number
    gridColor?: string
    gridOpacity?: number
    fogEnabled?: boolean
    fogMode?: string
    fogOpacity?: number
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: number
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    tokens?: MapTokenUncheckedCreateNestedManyWithoutMapInput
  }

  export type MapCreateOrConnectWithoutCampaignInput = {
    where: MapWhereUniqueInput
    create: XOR<MapCreateWithoutCampaignInput, MapUncheckedCreateWithoutCampaignInput>
  }

  export type MapCreateManyCampaignInputEnvelope = {
    data: MapCreateManyCampaignInput | MapCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type CharacterCreateWithoutCampaignInput = {
    id?: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    sheet?: CharacterSheetCreateNestedOneWithoutCharacterInput
    permissions?: CharacterPermissionCreateNestedManyWithoutCharacterInput
    tokens?: MapTokenCreateNestedManyWithoutCharacterInput
  }

  export type CharacterUncheckedCreateWithoutCampaignInput = {
    id?: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    sheet?: CharacterSheetUncheckedCreateNestedOneWithoutCharacterInput
    permissions?: CharacterPermissionUncheckedCreateNestedManyWithoutCharacterInput
    tokens?: MapTokenUncheckedCreateNestedManyWithoutCharacterInput
  }

  export type CharacterCreateOrConnectWithoutCampaignInput = {
    where: CharacterWhereUniqueInput
    create: XOR<CharacterCreateWithoutCampaignInput, CharacterUncheckedCreateWithoutCampaignInput>
  }

  export type CharacterCreateManyCampaignInputEnvelope = {
    data: CharacterCreateManyCampaignInput | CharacterCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedCampaignsInput = {
    update: XOR<UserUpdateWithoutOwnedCampaignsInput, UserUncheckedUpdateWithoutOwnedCampaignsInput>
    create: XOR<UserCreateWithoutOwnedCampaignsInput, UserUncheckedCreateWithoutOwnedCampaignsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedCampaignsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedCampaignsInput, UserUncheckedUpdateWithoutOwnedCampaignsInput>
  }

  export type UserUpdateWithoutOwnedCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    campaignMembers?: CampaignMemberUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    campaignMembers?: CampaignMemberUncheckedUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUncheckedUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CampaignMemberUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignMemberWhereUniqueInput
    update: XOR<CampaignMemberUpdateWithoutCampaignInput, CampaignMemberUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignMemberCreateWithoutCampaignInput, CampaignMemberUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignMemberUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignMemberWhereUniqueInput
    data: XOR<CampaignMemberUpdateWithoutCampaignInput, CampaignMemberUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignMemberUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignMemberScalarWhereInput
    data: XOR<CampaignMemberUpdateManyMutationInput, CampaignMemberUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignInviteUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignInviteWhereUniqueInput
    update: XOR<CampaignInviteUpdateWithoutCampaignInput, CampaignInviteUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignInviteCreateWithoutCampaignInput, CampaignInviteUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignInviteUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignInviteWhereUniqueInput
    data: XOR<CampaignInviteUpdateWithoutCampaignInput, CampaignInviteUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignInviteUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignInviteScalarWhereInput
    data: XOR<CampaignInviteUpdateManyMutationInput, CampaignInviteUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignSessionUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignSessionWhereUniqueInput
    update: XOR<CampaignSessionUpdateWithoutCampaignInput, CampaignSessionUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignSessionCreateWithoutCampaignInput, CampaignSessionUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignSessionUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignSessionWhereUniqueInput
    data: XOR<CampaignSessionUpdateWithoutCampaignInput, CampaignSessionUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignSessionUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignSessionScalarWhereInput
    data: XOR<CampaignSessionUpdateManyMutationInput, CampaignSessionUncheckedUpdateManyWithoutCampaignInput>
  }

  export type MapUpsertWithWhereUniqueWithoutCampaignInput = {
    where: MapWhereUniqueInput
    update: XOR<MapUpdateWithoutCampaignInput, MapUncheckedUpdateWithoutCampaignInput>
    create: XOR<MapCreateWithoutCampaignInput, MapUncheckedCreateWithoutCampaignInput>
  }

  export type MapUpdateWithWhereUniqueWithoutCampaignInput = {
    where: MapWhereUniqueInput
    data: XOR<MapUpdateWithoutCampaignInput, MapUncheckedUpdateWithoutCampaignInput>
  }

  export type MapUpdateManyWithWhereWithoutCampaignInput = {
    where: MapScalarWhereInput
    data: XOR<MapUpdateManyMutationInput, MapUncheckedUpdateManyWithoutCampaignInput>
  }

  export type MapScalarWhereInput = {
    AND?: MapScalarWhereInput | MapScalarWhereInput[]
    OR?: MapScalarWhereInput[]
    NOT?: MapScalarWhereInput | MapScalarWhereInput[]
    id?: StringFilter<"Map"> | string
    campaignId?: StringFilter<"Map"> | string
    name?: StringFilter<"Map"> | string
    width?: IntFilter<"Map"> | number
    height?: IntFilter<"Map"> | number
    cellSize?: IntFilter<"Map"> | number
    gridType?: EnumGridTypeFilter<"Map"> | $Enums.GridType
    backgroundImage?: StringNullableFilter<"Map"> | string | null
    backgroundFitMode?: StringFilter<"Map"> | string
    backgroundOffsetX?: IntFilter<"Map"> | number
    backgroundOffsetY?: IntFilter<"Map"> | number
    backgroundScale?: FloatFilter<"Map"> | number
    gridOffsetX?: IntFilter<"Map"> | number
    gridOffsetY?: IntFilter<"Map"> | number
    gridColor?: StringFilter<"Map"> | string
    gridOpacity?: FloatFilter<"Map"> | number
    fogEnabled?: BoolFilter<"Map"> | boolean
    fogMode?: StringFilter<"Map"> | string
    fogOpacity?: FloatFilter<"Map"> | number
    fogPlayersSeeExplored?: BoolFilter<"Map"> | boolean
    layerConfigJson?: JsonNullableFilter<"Map">
    sortOrder?: IntFilter<"Map"> | number
    isArchived?: BoolFilter<"Map"> | boolean
    createdAt?: DateTimeFilter<"Map"> | Date | string
    updatedAt?: DateTimeFilter<"Map"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Map"> | Date | string | null
  }

  export type CharacterUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CharacterWhereUniqueInput
    update: XOR<CharacterUpdateWithoutCampaignInput, CharacterUncheckedUpdateWithoutCampaignInput>
    create: XOR<CharacterCreateWithoutCampaignInput, CharacterUncheckedCreateWithoutCampaignInput>
  }

  export type CharacterUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CharacterWhereUniqueInput
    data: XOR<CharacterUpdateWithoutCampaignInput, CharacterUncheckedUpdateWithoutCampaignInput>
  }

  export type CharacterUpdateManyWithWhereWithoutCampaignInput = {
    where: CharacterScalarWhereInput
    data: XOR<CharacterUpdateManyMutationInput, CharacterUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CharacterScalarWhereInput = {
    AND?: CharacterScalarWhereInput | CharacterScalarWhereInput[]
    OR?: CharacterScalarWhereInput[]
    NOT?: CharacterScalarWhereInput | CharacterScalarWhereInput[]
    id?: StringFilter<"Character"> | string
    campaignId?: StringFilter<"Character"> | string
    ownerUserId?: StringNullableFilter<"Character"> | string | null
    createdByUserId?: StringFilter<"Character"> | string
    name?: StringFilter<"Character"> | string
    type?: EnumCharacterTypeFilter<"Character"> | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFilter<"Character"> | $Enums.CharacterVisibility
    portraitImage?: StringNullableFilter<"Character"> | string | null
    defaultTokenImage?: StringNullableFilter<"Character"> | string | null
    system?: StringFilter<"Character"> | string
    createdAt?: DateTimeFilter<"Character"> | Date | string
    updatedAt?: DateTimeFilter<"Character"> | Date | string
    archivedAt?: DateTimeNullableFilter<"Character"> | Date | string | null
  }

  export type CampaignCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedCampaignsInput
    invites?: CampaignInviteCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionCreateNestedManyWithoutCampaignInput
    maps?: MapCreateNestedManyWithoutCampaignInput
    characters?: CharacterCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutMembersInput = {
    id?: string
    ownerUserId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    invites?: CampaignInviteUncheckedCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionUncheckedCreateNestedManyWithoutCampaignInput
    maps?: MapUncheckedCreateNestedManyWithoutCampaignInput
    characters?: CharacterUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutMembersInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutMembersInput, CampaignUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutCampaignMembersInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignCreateNestedManyWithoutOwnerInput
    createdCampaignInvites?: CampaignInviteCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCampaignMembersInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    createdCampaignInvites?: CampaignInviteUncheckedCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionUncheckedCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCampaignMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCampaignMembersInput, UserUncheckedCreateWithoutCampaignMembersInput>
  }

  export type CampaignUpsertWithoutMembersInput = {
    update: XOR<CampaignUpdateWithoutMembersInput, CampaignUncheckedUpdateWithoutMembersInput>
    create: XOR<CampaignCreateWithoutMembersInput, CampaignUncheckedCreateWithoutMembersInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutMembersInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutMembersInput, CampaignUncheckedUpdateWithoutMembersInput>
  }

  export type CampaignUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedCampaignsNestedInput
    invites?: CampaignInviteUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUpdateManyWithoutCampaignNestedInput
    maps?: MapUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invites?: CampaignInviteUncheckedUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUncheckedUpdateManyWithoutCampaignNestedInput
    maps?: MapUncheckedUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type UserUpsertWithoutCampaignMembersInput = {
    update: XOR<UserUpdateWithoutCampaignMembersInput, UserUncheckedUpdateWithoutCampaignMembersInput>
    create: XOR<UserCreateWithoutCampaignMembersInput, UserUncheckedCreateWithoutCampaignMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCampaignMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCampaignMembersInput, UserUncheckedUpdateWithoutCampaignMembersInput>
  }

  export type UserUpdateWithoutCampaignMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUpdateManyWithoutOwnerNestedInput
    createdCampaignInvites?: CampaignInviteUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCampaignMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    createdCampaignInvites?: CampaignInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUncheckedUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CampaignCreateWithoutInvitesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedCampaignsInput
    members?: CampaignMemberCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionCreateNestedManyWithoutCampaignInput
    maps?: MapCreateNestedManyWithoutCampaignInput
    characters?: CharacterCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutInvitesInput = {
    id?: string
    ownerUserId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    members?: CampaignMemberUncheckedCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionUncheckedCreateNestedManyWithoutCampaignInput
    maps?: MapUncheckedCreateNestedManyWithoutCampaignInput
    characters?: CharacterUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutInvitesInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutInvitesInput, CampaignUncheckedCreateWithoutInvitesInput>
  }

  export type UserCreateWithoutCreatedCampaignInvitesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberCreateNestedManyWithoutUserInput
    createdCampaignSessions?: CampaignSessionCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedCampaignInvitesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberUncheckedCreateNestedManyWithoutUserInput
    createdCampaignSessions?: CampaignSessionUncheckedCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedCampaignInvitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedCampaignInvitesInput, UserUncheckedCreateWithoutCreatedCampaignInvitesInput>
  }

  export type CampaignUpsertWithoutInvitesInput = {
    update: XOR<CampaignUpdateWithoutInvitesInput, CampaignUncheckedUpdateWithoutInvitesInput>
    create: XOR<CampaignCreateWithoutInvitesInput, CampaignUncheckedCreateWithoutInvitesInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutInvitesInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutInvitesInput, CampaignUncheckedUpdateWithoutInvitesInput>
  }

  export type CampaignUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedCampaignsNestedInput
    members?: CampaignMemberUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUpdateManyWithoutCampaignNestedInput
    maps?: MapUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: CampaignMemberUncheckedUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUncheckedUpdateManyWithoutCampaignNestedInput
    maps?: MapUncheckedUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type UserUpsertWithoutCreatedCampaignInvitesInput = {
    update: XOR<UserUpdateWithoutCreatedCampaignInvitesInput, UserUncheckedUpdateWithoutCreatedCampaignInvitesInput>
    create: XOR<UserCreateWithoutCreatedCampaignInvitesInput, UserUncheckedCreateWithoutCreatedCampaignInvitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedCampaignInvitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedCampaignInvitesInput, UserUncheckedUpdateWithoutCreatedCampaignInvitesInput>
  }

  export type UserUpdateWithoutCreatedCampaignInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUpdateManyWithoutUserNestedInput
    createdCampaignSessions?: CampaignSessionUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedCampaignInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUncheckedUpdateManyWithoutUserNestedInput
    createdCampaignSessions?: CampaignSessionUncheckedUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CampaignCreateWithoutSessionsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedCampaignsInput
    members?: CampaignMemberCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteCreateNestedManyWithoutCampaignInput
    maps?: MapCreateNestedManyWithoutCampaignInput
    characters?: CharacterCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutSessionsInput = {
    id?: string
    ownerUserId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    members?: CampaignMemberUncheckedCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteUncheckedCreateNestedManyWithoutCampaignInput
    maps?: MapUncheckedCreateNestedManyWithoutCampaignInput
    characters?: CharacterUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutSessionsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutSessionsInput, CampaignUncheckedCreateWithoutSessionsInput>
  }

  export type UserCreateWithoutCreatedCampaignSessionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedCampaignSessionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberUncheckedCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteUncheckedCreateNestedManyWithoutCreatedByInput
    characterPermissions?: CharacterPermissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedCampaignSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedCampaignSessionsInput, UserUncheckedCreateWithoutCreatedCampaignSessionsInput>
  }

  export type CampaignUpsertWithoutSessionsInput = {
    update: XOR<CampaignUpdateWithoutSessionsInput, CampaignUncheckedUpdateWithoutSessionsInput>
    create: XOR<CampaignCreateWithoutSessionsInput, CampaignUncheckedCreateWithoutSessionsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutSessionsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutSessionsInput, CampaignUncheckedUpdateWithoutSessionsInput>
  }

  export type CampaignUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedCampaignsNestedInput
    members?: CampaignMemberUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUpdateManyWithoutCampaignNestedInput
    maps?: MapUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: CampaignMemberUncheckedUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUncheckedUpdateManyWithoutCampaignNestedInput
    maps?: MapUncheckedUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type UserUpsertWithoutCreatedCampaignSessionsInput = {
    update: XOR<UserUpdateWithoutCreatedCampaignSessionsInput, UserUncheckedUpdateWithoutCreatedCampaignSessionsInput>
    create: XOR<UserCreateWithoutCreatedCampaignSessionsInput, UserUncheckedCreateWithoutCreatedCampaignSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedCampaignSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedCampaignSessionsInput, UserUncheckedUpdateWithoutCreatedCampaignSessionsInput>
  }

  export type UserUpdateWithoutCreatedCampaignSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedCampaignSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUncheckedUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    characterPermissions?: CharacterPermissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CampaignCreateWithoutMapsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedCampaignsInput
    members?: CampaignMemberCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionCreateNestedManyWithoutCampaignInput
    characters?: CharacterCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutMapsInput = {
    id?: string
    ownerUserId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    members?: CampaignMemberUncheckedCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteUncheckedCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionUncheckedCreateNestedManyWithoutCampaignInput
    characters?: CharacterUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutMapsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutMapsInput, CampaignUncheckedCreateWithoutMapsInput>
  }

  export type MapTokenCreateWithoutMapInput = {
    id?: string
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    character?: CharacterCreateNestedOneWithoutTokensInput
  }

  export type MapTokenUncheckedCreateWithoutMapInput = {
    id?: string
    characterId?: string | null
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MapTokenCreateOrConnectWithoutMapInput = {
    where: MapTokenWhereUniqueInput
    create: XOR<MapTokenCreateWithoutMapInput, MapTokenUncheckedCreateWithoutMapInput>
  }

  export type MapTokenCreateManyMapInputEnvelope = {
    data: MapTokenCreateManyMapInput | MapTokenCreateManyMapInput[]
    skipDuplicates?: boolean
  }

  export type CampaignUpsertWithoutMapsInput = {
    update: XOR<CampaignUpdateWithoutMapsInput, CampaignUncheckedUpdateWithoutMapsInput>
    create: XOR<CampaignCreateWithoutMapsInput, CampaignUncheckedCreateWithoutMapsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutMapsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutMapsInput, CampaignUncheckedUpdateWithoutMapsInput>
  }

  export type CampaignUpdateWithoutMapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedCampaignsNestedInput
    members?: CampaignMemberUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutMapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: CampaignMemberUncheckedUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUncheckedUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUncheckedUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type MapTokenUpsertWithWhereUniqueWithoutMapInput = {
    where: MapTokenWhereUniqueInput
    update: XOR<MapTokenUpdateWithoutMapInput, MapTokenUncheckedUpdateWithoutMapInput>
    create: XOR<MapTokenCreateWithoutMapInput, MapTokenUncheckedCreateWithoutMapInput>
  }

  export type MapTokenUpdateWithWhereUniqueWithoutMapInput = {
    where: MapTokenWhereUniqueInput
    data: XOR<MapTokenUpdateWithoutMapInput, MapTokenUncheckedUpdateWithoutMapInput>
  }

  export type MapTokenUpdateManyWithWhereWithoutMapInput = {
    where: MapTokenScalarWhereInput
    data: XOR<MapTokenUpdateManyMutationInput, MapTokenUncheckedUpdateManyWithoutMapInput>
  }

  export type MapTokenScalarWhereInput = {
    AND?: MapTokenScalarWhereInput | MapTokenScalarWhereInput[]
    OR?: MapTokenScalarWhereInput[]
    NOT?: MapTokenScalarWhereInput | MapTokenScalarWhereInput[]
    id?: StringFilter<"MapToken"> | string
    mapId?: StringFilter<"MapToken"> | string
    characterId?: StringNullableFilter<"MapToken"> | string | null
    name?: StringNullableFilter<"MapToken"> | string | null
    image?: StringNullableFilter<"MapToken"> | string | null
    x?: IntFilter<"MapToken"> | number
    y?: IntFilter<"MapToken"> | number
    widthCells?: IntFilter<"MapToken"> | number
    heightCells?: IntFilter<"MapToken"> | number
    rotation?: FloatFilter<"MapToken"> | number
    zIndex?: IntFilter<"MapToken"> | number
    scaleX?: FloatFilter<"MapToken"> | number
    scaleY?: FloatFilter<"MapToken"> | number
    layerKey?: StringFilter<"MapToken"> | string
    visibility?: EnumTokenVisibilityFilter<"MapToken"> | $Enums.TokenVisibility
    isLocked?: BoolFilter<"MapToken"> | boolean
    isHidden?: BoolFilter<"MapToken"> | boolean
    elevation?: IntFilter<"MapToken"> | number
    standMode?: StringFilter<"MapToken"> | string
    barsJson?: JsonNullableFilter<"MapToken">
    statusJson?: JsonNullableFilter<"MapToken">
    visionJson?: JsonNullableFilter<"MapToken">
    lightJson?: JsonNullableFilter<"MapToken">
    disposition?: EnumTokenDispositionFilter<"MapToken"> | $Enums.TokenDisposition
    createdAt?: DateTimeFilter<"MapToken"> | Date | string
    updatedAt?: DateTimeFilter<"MapToken"> | Date | string
    deletedAt?: DateTimeNullableFilter<"MapToken"> | Date | string | null
  }

  export type MapCreateWithoutTokensInput = {
    id?: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType?: $Enums.GridType
    backgroundImage?: string | null
    backgroundFitMode?: string
    backgroundOffsetX?: number
    backgroundOffsetY?: number
    backgroundScale?: number
    gridOffsetX?: number
    gridOffsetY?: number
    gridColor?: string
    gridOpacity?: number
    fogEnabled?: boolean
    fogMode?: string
    fogOpacity?: number
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: number
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutMapsInput
  }

  export type MapUncheckedCreateWithoutTokensInput = {
    id?: string
    campaignId: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType?: $Enums.GridType
    backgroundImage?: string | null
    backgroundFitMode?: string
    backgroundOffsetX?: number
    backgroundOffsetY?: number
    backgroundScale?: number
    gridOffsetX?: number
    gridOffsetY?: number
    gridColor?: string
    gridOpacity?: number
    fogEnabled?: boolean
    fogMode?: string
    fogOpacity?: number
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: number
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MapCreateOrConnectWithoutTokensInput = {
    where: MapWhereUniqueInput
    create: XOR<MapCreateWithoutTokensInput, MapUncheckedCreateWithoutTokensInput>
  }

  export type CharacterCreateWithoutTokensInput = {
    id?: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutCharactersInput
    sheet?: CharacterSheetCreateNestedOneWithoutCharacterInput
    permissions?: CharacterPermissionCreateNestedManyWithoutCharacterInput
  }

  export type CharacterUncheckedCreateWithoutTokensInput = {
    id?: string
    campaignId: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    sheet?: CharacterSheetUncheckedCreateNestedOneWithoutCharacterInput
    permissions?: CharacterPermissionUncheckedCreateNestedManyWithoutCharacterInput
  }

  export type CharacterCreateOrConnectWithoutTokensInput = {
    where: CharacterWhereUniqueInput
    create: XOR<CharacterCreateWithoutTokensInput, CharacterUncheckedCreateWithoutTokensInput>
  }

  export type MapUpsertWithoutTokensInput = {
    update: XOR<MapUpdateWithoutTokensInput, MapUncheckedUpdateWithoutTokensInput>
    create: XOR<MapCreateWithoutTokensInput, MapUncheckedCreateWithoutTokensInput>
    where?: MapWhereInput
  }

  export type MapUpdateToOneWithWhereWithoutTokensInput = {
    where?: MapWhereInput
    data: XOR<MapUpdateWithoutTokensInput, MapUncheckedUpdateWithoutTokensInput>
  }

  export type MapUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutMapsNestedInput
  }

  export type MapUncheckedUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CharacterUpsertWithoutTokensInput = {
    update: XOR<CharacterUpdateWithoutTokensInput, CharacterUncheckedUpdateWithoutTokensInput>
    create: XOR<CharacterCreateWithoutTokensInput, CharacterUncheckedCreateWithoutTokensInput>
    where?: CharacterWhereInput
  }

  export type CharacterUpdateToOneWithWhereWithoutTokensInput = {
    where?: CharacterWhereInput
    data: XOR<CharacterUpdateWithoutTokensInput, CharacterUncheckedUpdateWithoutTokensInput>
  }

  export type CharacterUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutCharactersNestedInput
    sheet?: CharacterSheetUpdateOneWithoutCharacterNestedInput
    permissions?: CharacterPermissionUpdateManyWithoutCharacterNestedInput
  }

  export type CharacterUncheckedUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheet?: CharacterSheetUncheckedUpdateOneWithoutCharacterNestedInput
    permissions?: CharacterPermissionUncheckedUpdateManyWithoutCharacterNestedInput
  }

  export type CampaignCreateWithoutCharactersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutOwnedCampaignsInput
    members?: CampaignMemberCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionCreateNestedManyWithoutCampaignInput
    maps?: MapCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutCharactersInput = {
    id?: string
    ownerUserId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    members?: CampaignMemberUncheckedCreateNestedManyWithoutCampaignInput
    invites?: CampaignInviteUncheckedCreateNestedManyWithoutCampaignInput
    sessions?: CampaignSessionUncheckedCreateNestedManyWithoutCampaignInput
    maps?: MapUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutCharactersInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutCharactersInput, CampaignUncheckedCreateWithoutCharactersInput>
  }

  export type CharacterSheetCreateWithoutCharacterInput = {
    id?: string
    system?: string
    schemaVersion?: number
    dataJson: JsonNullValueInput | InputJsonValue
    version?: number
    lastEditedByUserId?: string | null
    updatedAt?: Date | string
  }

  export type CharacterSheetUncheckedCreateWithoutCharacterInput = {
    id?: string
    system?: string
    schemaVersion?: number
    dataJson: JsonNullValueInput | InputJsonValue
    version?: number
    lastEditedByUserId?: string | null
    updatedAt?: Date | string
  }

  export type CharacterSheetCreateOrConnectWithoutCharacterInput = {
    where: CharacterSheetWhereUniqueInput
    create: XOR<CharacterSheetCreateWithoutCharacterInput, CharacterSheetUncheckedCreateWithoutCharacterInput>
  }

  export type CharacterPermissionCreateWithoutCharacterInput = {
    id?: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
    user: UserCreateNestedOneWithoutCharacterPermissionsInput
  }

  export type CharacterPermissionUncheckedCreateWithoutCharacterInput = {
    id?: string
    userId: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
  }

  export type CharacterPermissionCreateOrConnectWithoutCharacterInput = {
    where: CharacterPermissionWhereUniqueInput
    create: XOR<CharacterPermissionCreateWithoutCharacterInput, CharacterPermissionUncheckedCreateWithoutCharacterInput>
  }

  export type CharacterPermissionCreateManyCharacterInputEnvelope = {
    data: CharacterPermissionCreateManyCharacterInput | CharacterPermissionCreateManyCharacterInput[]
    skipDuplicates?: boolean
  }

  export type MapTokenCreateWithoutCharacterInput = {
    id?: string
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    map: MapCreateNestedOneWithoutTokensInput
  }

  export type MapTokenUncheckedCreateWithoutCharacterInput = {
    id?: string
    mapId: string
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MapTokenCreateOrConnectWithoutCharacterInput = {
    where: MapTokenWhereUniqueInput
    create: XOR<MapTokenCreateWithoutCharacterInput, MapTokenUncheckedCreateWithoutCharacterInput>
  }

  export type MapTokenCreateManyCharacterInputEnvelope = {
    data: MapTokenCreateManyCharacterInput | MapTokenCreateManyCharacterInput[]
    skipDuplicates?: boolean
  }

  export type CampaignUpsertWithoutCharactersInput = {
    update: XOR<CampaignUpdateWithoutCharactersInput, CampaignUncheckedUpdateWithoutCharactersInput>
    create: XOR<CampaignCreateWithoutCharactersInput, CampaignUncheckedCreateWithoutCharactersInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutCharactersInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutCharactersInput, CampaignUncheckedUpdateWithoutCharactersInput>
  }

  export type CampaignUpdateWithoutCharactersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutOwnedCampaignsNestedInput
    members?: CampaignMemberUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUpdateManyWithoutCampaignNestedInput
    maps?: MapUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutCharactersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: CampaignMemberUncheckedUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUncheckedUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUncheckedUpdateManyWithoutCampaignNestedInput
    maps?: MapUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CharacterSheetUpsertWithoutCharacterInput = {
    update: XOR<CharacterSheetUpdateWithoutCharacterInput, CharacterSheetUncheckedUpdateWithoutCharacterInput>
    create: XOR<CharacterSheetCreateWithoutCharacterInput, CharacterSheetUncheckedCreateWithoutCharacterInput>
    where?: CharacterSheetWhereInput
  }

  export type CharacterSheetUpdateToOneWithWhereWithoutCharacterInput = {
    where?: CharacterSheetWhereInput
    data: XOR<CharacterSheetUpdateWithoutCharacterInput, CharacterSheetUncheckedUpdateWithoutCharacterInput>
  }

  export type CharacterSheetUpdateWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    schemaVersion?: IntFieldUpdateOperationsInput | number
    dataJson?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    lastEditedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterSheetUncheckedUpdateWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    schemaVersion?: IntFieldUpdateOperationsInput | number
    dataJson?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    lastEditedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterPermissionUpsertWithWhereUniqueWithoutCharacterInput = {
    where: CharacterPermissionWhereUniqueInput
    update: XOR<CharacterPermissionUpdateWithoutCharacterInput, CharacterPermissionUncheckedUpdateWithoutCharacterInput>
    create: XOR<CharacterPermissionCreateWithoutCharacterInput, CharacterPermissionUncheckedCreateWithoutCharacterInput>
  }

  export type CharacterPermissionUpdateWithWhereUniqueWithoutCharacterInput = {
    where: CharacterPermissionWhereUniqueInput
    data: XOR<CharacterPermissionUpdateWithoutCharacterInput, CharacterPermissionUncheckedUpdateWithoutCharacterInput>
  }

  export type CharacterPermissionUpdateManyWithWhereWithoutCharacterInput = {
    where: CharacterPermissionScalarWhereInput
    data: XOR<CharacterPermissionUpdateManyMutationInput, CharacterPermissionUncheckedUpdateManyWithoutCharacterInput>
  }

  export type MapTokenUpsertWithWhereUniqueWithoutCharacterInput = {
    where: MapTokenWhereUniqueInput
    update: XOR<MapTokenUpdateWithoutCharacterInput, MapTokenUncheckedUpdateWithoutCharacterInput>
    create: XOR<MapTokenCreateWithoutCharacterInput, MapTokenUncheckedCreateWithoutCharacterInput>
  }

  export type MapTokenUpdateWithWhereUniqueWithoutCharacterInput = {
    where: MapTokenWhereUniqueInput
    data: XOR<MapTokenUpdateWithoutCharacterInput, MapTokenUncheckedUpdateWithoutCharacterInput>
  }

  export type MapTokenUpdateManyWithWhereWithoutCharacterInput = {
    where: MapTokenScalarWhereInput
    data: XOR<MapTokenUpdateManyMutationInput, MapTokenUncheckedUpdateManyWithoutCharacterInput>
  }

  export type CharacterCreateWithoutSheetInput = {
    id?: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutCharactersInput
    permissions?: CharacterPermissionCreateNestedManyWithoutCharacterInput
    tokens?: MapTokenCreateNestedManyWithoutCharacterInput
  }

  export type CharacterUncheckedCreateWithoutSheetInput = {
    id?: string
    campaignId: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    permissions?: CharacterPermissionUncheckedCreateNestedManyWithoutCharacterInput
    tokens?: MapTokenUncheckedCreateNestedManyWithoutCharacterInput
  }

  export type CharacterCreateOrConnectWithoutSheetInput = {
    where: CharacterWhereUniqueInput
    create: XOR<CharacterCreateWithoutSheetInput, CharacterUncheckedCreateWithoutSheetInput>
  }

  export type CharacterUpsertWithoutSheetInput = {
    update: XOR<CharacterUpdateWithoutSheetInput, CharacterUncheckedUpdateWithoutSheetInput>
    create: XOR<CharacterCreateWithoutSheetInput, CharacterUncheckedCreateWithoutSheetInput>
    where?: CharacterWhereInput
  }

  export type CharacterUpdateToOneWithWhereWithoutSheetInput = {
    where?: CharacterWhereInput
    data: XOR<CharacterUpdateWithoutSheetInput, CharacterUncheckedUpdateWithoutSheetInput>
  }

  export type CharacterUpdateWithoutSheetInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutCharactersNestedInput
    permissions?: CharacterPermissionUpdateManyWithoutCharacterNestedInput
    tokens?: MapTokenUpdateManyWithoutCharacterNestedInput
  }

  export type CharacterUncheckedUpdateWithoutSheetInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: CharacterPermissionUncheckedUpdateManyWithoutCharacterNestedInput
    tokens?: MapTokenUncheckedUpdateManyWithoutCharacterNestedInput
  }

  export type CharacterCreateWithoutPermissionsInput = {
    id?: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    campaign: CampaignCreateNestedOneWithoutCharactersInput
    sheet?: CharacterSheetCreateNestedOneWithoutCharacterInput
    tokens?: MapTokenCreateNestedManyWithoutCharacterInput
  }

  export type CharacterUncheckedCreateWithoutPermissionsInput = {
    id?: string
    campaignId: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
    sheet?: CharacterSheetUncheckedCreateNestedOneWithoutCharacterInput
    tokens?: MapTokenUncheckedCreateNestedManyWithoutCharacterInput
  }

  export type CharacterCreateOrConnectWithoutPermissionsInput = {
    where: CharacterWhereUniqueInput
    create: XOR<CharacterCreateWithoutPermissionsInput, CharacterUncheckedCreateWithoutPermissionsInput>
  }

  export type UserCreateWithoutCharacterPermissionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCharacterPermissionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    ownedCampaigns?: CampaignUncheckedCreateNestedManyWithoutOwnerInput
    campaignMembers?: CampaignMemberUncheckedCreateNestedManyWithoutUserInput
    createdCampaignInvites?: CampaignInviteUncheckedCreateNestedManyWithoutCreatedByInput
    createdCampaignSessions?: CampaignSessionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCharacterPermissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCharacterPermissionsInput, UserUncheckedCreateWithoutCharacterPermissionsInput>
  }

  export type CharacterUpsertWithoutPermissionsInput = {
    update: XOR<CharacterUpdateWithoutPermissionsInput, CharacterUncheckedUpdateWithoutPermissionsInput>
    create: XOR<CharacterCreateWithoutPermissionsInput, CharacterUncheckedCreateWithoutPermissionsInput>
    where?: CharacterWhereInput
  }

  export type CharacterUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: CharacterWhereInput
    data: XOR<CharacterUpdateWithoutPermissionsInput, CharacterUncheckedUpdateWithoutPermissionsInput>
  }

  export type CharacterUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutCharactersNestedInput
    sheet?: CharacterSheetUpdateOneWithoutCharacterNestedInput
    tokens?: MapTokenUpdateManyWithoutCharacterNestedInput
  }

  export type CharacterUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheet?: CharacterSheetUncheckedUpdateOneWithoutCharacterNestedInput
    tokens?: MapTokenUncheckedUpdateManyWithoutCharacterNestedInput
  }

  export type UserUpsertWithoutCharacterPermissionsInput = {
    update: XOR<UserUpdateWithoutCharacterPermissionsInput, UserUncheckedUpdateWithoutCharacterPermissionsInput>
    create: XOR<UserCreateWithoutCharacterPermissionsInput, UserUncheckedCreateWithoutCharacterPermissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCharacterPermissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCharacterPermissionsInput, UserUncheckedUpdateWithoutCharacterPermissionsInput>
  }

  export type UserUpdateWithoutCharacterPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCharacterPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    ownedCampaigns?: CampaignUncheckedUpdateManyWithoutOwnerNestedInput
    campaignMembers?: CampaignMemberUncheckedUpdateManyWithoutUserNestedInput
    createdCampaignInvites?: CampaignInviteUncheckedUpdateManyWithoutCreatedByNestedInput
    createdCampaignSessions?: CampaignSessionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserSessionCreateManyUserInput = {
    id?: string
    refreshTokenHash?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CampaignCreateManyOwnerInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
  }

  export type CampaignMemberCreateManyUserInput = {
    id?: string
    campaignId: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
  }

  export type CampaignInviteCreateManyCreatedByInput = {
    id?: string
    campaignId: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CampaignSessionCreateManyCreatedByInput = {
    id?: string
    campaignId: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
  }

  export type CharacterPermissionCreateManyUserInput = {
    id?: string
    characterId: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
  }

  export type UserSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: CampaignMemberUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUpdateManyWithoutCampaignNestedInput
    maps?: MapUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: CampaignMemberUncheckedUpdateManyWithoutCampaignNestedInput
    invites?: CampaignInviteUncheckedUpdateManyWithoutCampaignNestedInput
    sessions?: CampaignSessionUncheckedUpdateManyWithoutCampaignNestedInput
    maps?: MapUncheckedUpdateManyWithoutCampaignNestedInput
    characters?: CharacterUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutMembersNestedInput
  }

  export type CampaignMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignInviteUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutInvitesNestedInput
  }

  export type CampaignInviteUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignInviteUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignSessionUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: CampaignUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type CampaignSessionUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignSessionUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CharacterPermissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
    character?: CharacterUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type CharacterPermissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    characterId?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CharacterPermissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    characterId?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CampaignMemberCreateManyCampaignInput = {
    id?: string
    userId: string
    role?: $Enums.CampaignRole
    displayName?: string | null
    joinedAt?: Date | string
    lastSeenAt?: Date | string | null
  }

  export type CampaignInviteCreateManyCampaignInput = {
    id?: string
    code: string
    roleOnJoin?: $Enums.CampaignRole
    createdByUserId: string
    maxUses?: number | null
    usesCount?: number
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CampaignSessionCreateManyCampaignInput = {
    id?: string
    activeMapId?: string | null
    status?: $Enums.CampaignSessionStatus
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdByUserId: string
  }

  export type MapCreateManyCampaignInput = {
    id?: string
    name: string
    width: number
    height: number
    cellSize: number
    gridType?: $Enums.GridType
    backgroundImage?: string | null
    backgroundFitMode?: string
    backgroundOffsetX?: number
    backgroundOffsetY?: number
    backgroundScale?: number
    gridOffsetX?: number
    gridOffsetY?: number
    gridColor?: string
    gridOpacity?: number
    fogEnabled?: boolean
    fogMode?: string
    fogOpacity?: number
    fogPlayersSeeExplored?: boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: number
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type CharacterCreateManyCampaignInput = {
    id?: string
    ownerUserId?: string | null
    createdByUserId: string
    name: string
    type?: $Enums.CharacterType
    visibility?: $Enums.CharacterVisibility
    portraitImage?: string | null
    defaultTokenImage?: string | null
    system?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archivedAt?: Date | string | null
  }

  export type CampaignMemberUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutCampaignMembersNestedInput
  }

  export type CampaignMemberUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignMemberUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CampaignInviteUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedCampaignInvitesNestedInput
  }

  export type CampaignInviteUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    createdByUserId?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignInviteUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    roleOnJoin?: EnumCampaignRoleFieldUpdateOperationsInput | $Enums.CampaignRole
    createdByUserId?: StringFieldUpdateOperationsInput | string
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usesCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignSessionUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneRequiredWithoutCreatedCampaignSessionsNestedInput
  }

  export type CampaignSessionUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type CampaignSessionUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    activeMapId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignSessionStatusFieldUpdateOperationsInput | $Enums.CampaignSessionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type MapUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tokens?: MapTokenUpdateManyWithoutMapNestedInput
  }

  export type MapUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tokens?: MapTokenUncheckedUpdateManyWithoutMapNestedInput
  }

  export type MapUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    cellSize?: IntFieldUpdateOperationsInput | number
    gridType?: EnumGridTypeFieldUpdateOperationsInput | $Enums.GridType
    backgroundImage?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundFitMode?: StringFieldUpdateOperationsInput | string
    backgroundOffsetX?: IntFieldUpdateOperationsInput | number
    backgroundOffsetY?: IntFieldUpdateOperationsInput | number
    backgroundScale?: FloatFieldUpdateOperationsInput | number
    gridOffsetX?: IntFieldUpdateOperationsInput | number
    gridOffsetY?: IntFieldUpdateOperationsInput | number
    gridColor?: StringFieldUpdateOperationsInput | string
    gridOpacity?: FloatFieldUpdateOperationsInput | number
    fogEnabled?: BoolFieldUpdateOperationsInput | boolean
    fogMode?: StringFieldUpdateOperationsInput | string
    fogOpacity?: FloatFieldUpdateOperationsInput | number
    fogPlayersSeeExplored?: BoolFieldUpdateOperationsInput | boolean
    layerConfigJson?: NullableJsonNullValueInput | InputJsonValue
    sortOrder?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CharacterUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheet?: CharacterSheetUpdateOneWithoutCharacterNestedInput
    permissions?: CharacterPermissionUpdateManyWithoutCharacterNestedInput
    tokens?: MapTokenUpdateManyWithoutCharacterNestedInput
  }

  export type CharacterUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheet?: CharacterSheetUncheckedUpdateOneWithoutCharacterNestedInput
    permissions?: CharacterPermissionUncheckedUpdateManyWithoutCharacterNestedInput
    tokens?: MapTokenUncheckedUpdateManyWithoutCharacterNestedInput
  }

  export type CharacterUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCharacterTypeFieldUpdateOperationsInput | $Enums.CharacterType
    visibility?: EnumCharacterVisibilityFieldUpdateOperationsInput | $Enums.CharacterVisibility
    portraitImage?: NullableStringFieldUpdateOperationsInput | string | null
    defaultTokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MapTokenCreateManyMapInput = {
    id?: string
    characterId?: string | null
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MapTokenUpdateWithoutMapInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    character?: CharacterUpdateOneWithoutTokensNestedInput
  }

  export type MapTokenUncheckedUpdateWithoutMapInput = {
    id?: StringFieldUpdateOperationsInput | string
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MapTokenUncheckedUpdateManyWithoutMapInput = {
    id?: StringFieldUpdateOperationsInput | string
    characterId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CharacterPermissionCreateManyCharacterInput = {
    id?: string
    userId: string
    canView?: boolean
    canEdit?: boolean
    canControl?: boolean
  }

  export type MapTokenCreateManyCharacterInput = {
    id?: string
    mapId: string
    name?: string | null
    image?: string | null
    x: number
    y: number
    widthCells?: number
    heightCells?: number
    rotation?: number
    zIndex?: number
    scaleX?: number
    scaleY?: number
    layerKey?: string
    visibility?: $Enums.TokenVisibility
    isLocked?: boolean
    isHidden?: boolean
    elevation?: number
    standMode?: string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: $Enums.TokenDisposition
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type CharacterPermissionUpdateWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCharacterPermissionsNestedInput
  }

  export type CharacterPermissionUncheckedUpdateWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CharacterPermissionUncheckedUpdateManyWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    canView?: BoolFieldUpdateOperationsInput | boolean
    canEdit?: BoolFieldUpdateOperationsInput | boolean
    canControl?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MapTokenUpdateWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    map?: MapUpdateOneRequiredWithoutTokensNestedInput
  }

  export type MapTokenUncheckedUpdateWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MapTokenUncheckedUpdateManyWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    mapId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    widthCells?: IntFieldUpdateOperationsInput | number
    heightCells?: IntFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    zIndex?: IntFieldUpdateOperationsInput | number
    scaleX?: FloatFieldUpdateOperationsInput | number
    scaleY?: FloatFieldUpdateOperationsInput | number
    layerKey?: StringFieldUpdateOperationsInput | string
    visibility?: EnumTokenVisibilityFieldUpdateOperationsInput | $Enums.TokenVisibility
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    elevation?: IntFieldUpdateOperationsInput | number
    standMode?: StringFieldUpdateOperationsInput | string
    barsJson?: NullableJsonNullValueInput | InputJsonValue
    statusJson?: NullableJsonNullValueInput | InputJsonValue
    visionJson?: NullableJsonNullValueInput | InputJsonValue
    lightJson?: NullableJsonNullValueInput | InputJsonValue
    disposition?: EnumTokenDispositionFieldUpdateOperationsInput | $Enums.TokenDisposition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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