import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeISO: any;
};

export type Band = {
  __typename?: 'Band';
  bandType: BandType;
  id: Scalars['Float'];
  numberOfMusicians: Scalars['Float'];
};

export type BandType = {
  __typename?: 'BandType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  address: Scalars['String'];
  band: Band;
  cost: Scalars['Float'];
  createdAt: Scalars['DateTimeISO'];
  endAt: Scalars['DateTimeISO'];
  id: Scalars['Float'];
  musicians: Array<Musician>;
  name: Scalars['String'];
  notAvailableUsers: Array<User>;
  personInCharge: PersonInCharge;
  startAt: Scalars['DateTimeISO'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
};

export type InstrumentType = {
  __typename?: 'InstrumentType';
  id: Scalars['Float'];
  name: Scalars['String'];
  tone: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Musician = {
  __typename?: 'Musician';
  event: Event;
  id: Scalars['Float'];
  instrumentType: InstrumentType;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  initializePassword: Scalars['Boolean'];
  login: Scalars['String'];
  logout: Scalars['String'];
  resetPassword: Scalars['Boolean'];
  resetPasswordRequest: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  data: NewUserInput;
};


export type MutationInitializePasswordArgs = {
  data: ResetPasswordInput;
  passwordToken: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
  resetPasswordToken: Scalars['String'];
};


export type MutationResetPasswordRequestArgs = {
  data: ResetPasswordRequestInput;
};

export type NewUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  group?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type PersonInCharge = {
  __typename?: 'PersonInCharge';
  city: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  role: Scalars['String'];
  zipCode: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  instrumentTypes: Array<InstrumentType>;
  musicians: Array<User>;
};


export type QueryMusiciansArgs = {
  instrumentTypeId?: InputMaybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
};

export type ResetPasswordRequestInput = {
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTimeISO'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  instrumentTypes: Array<InstrumentType>;
  lastName: Scalars['String'];
  musicians: Array<Musician>;
  notAvailableEvents: Array<Event>;
  phoneNumber: Scalars['String'];
  preferedInstrument: InstrumentType;
  role: Scalars['String'];
  updateddAt: Scalars['DateTimeISO'];
};

export type GetInstrumentTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInstrumentTypesQuery = { __typename?: 'Query', instrumentTypes: Array<{ __typename?: 'InstrumentType', id: number, name: string, tone: string }> };

export type InitializePasswordMutationVariables = Exact<{
  passwordToken: Scalars['String'];
  data: ResetPasswordInput;
}>;


export type InitializePasswordMutation = { __typename?: 'Mutation', initializePassword: boolean };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordToken: Scalars['String'];
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type ResetPasswordRequestMutationVariables = Exact<{
  data: ResetPasswordRequestInput;
}>;


export type ResetPasswordRequestMutation = { __typename?: 'Mutation', resetPasswordRequest: boolean };

export type SearchMusiciansQueryVariables = Exact<{
  instrumentTypeId?: InputMaybe<Scalars['String']>;
}>;


export type SearchMusiciansQuery = { __typename?: 'Query', musicians: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, phoneNumber: string, instrumentTypes: Array<{ __typename?: 'InstrumentType', name: string }> }> };


export const GetInstrumentTypesDocument = gql`
    query GetInstrumentTypes {
  instrumentTypes {
    id
    name
    tone
  }
}
    `;

/**
 * __useGetInstrumentTypesQuery__
 *
 * To run a query within a React component, call `useGetInstrumentTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInstrumentTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInstrumentTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInstrumentTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetInstrumentTypesQuery, GetInstrumentTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInstrumentTypesQuery, GetInstrumentTypesQueryVariables>(GetInstrumentTypesDocument, options);
      }
export function useGetInstrumentTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInstrumentTypesQuery, GetInstrumentTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInstrumentTypesQuery, GetInstrumentTypesQueryVariables>(GetInstrumentTypesDocument, options);
        }
export function useGetInstrumentTypesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetInstrumentTypesQuery, GetInstrumentTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInstrumentTypesQuery, GetInstrumentTypesQueryVariables>(GetInstrumentTypesDocument, options);
        }
export type GetInstrumentTypesQueryHookResult = ReturnType<typeof useGetInstrumentTypesQuery>;
export type GetInstrumentTypesLazyQueryHookResult = ReturnType<typeof useGetInstrumentTypesLazyQuery>;
export type GetInstrumentTypesSuspenseQueryHookResult = ReturnType<typeof useGetInstrumentTypesSuspenseQuery>;
export type GetInstrumentTypesQueryResult = Apollo.QueryResult<GetInstrumentTypesQuery, GetInstrumentTypesQueryVariables>;
export const InitializePasswordDocument = gql`
    mutation InitializePassword($passwordToken: String!, $data: ResetPasswordInput!) {
  initializePassword(passwordToken: $passwordToken, data: $data)
}
    `;
export type InitializePasswordMutationFn = Apollo.MutationFunction<InitializePasswordMutation, InitializePasswordMutationVariables>;

/**
 * __useInitializePasswordMutation__
 *
 * To run a mutation, you first call `useInitializePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitializePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initializePasswordMutation, { data, loading, error }] = useInitializePasswordMutation({
 *   variables: {
 *      passwordToken: // value for 'passwordToken'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInitializePasswordMutation(baseOptions?: Apollo.MutationHookOptions<InitializePasswordMutation, InitializePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InitializePasswordMutation, InitializePasswordMutationVariables>(InitializePasswordDocument, options);
      }
export type InitializePasswordMutationHookResult = ReturnType<typeof useInitializePasswordMutation>;
export type InitializePasswordMutationResult = Apollo.MutationResult<InitializePasswordMutation>;
export type InitializePasswordMutationOptions = Apollo.BaseMutationOptions<InitializePasswordMutation, InitializePasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($resetPasswordToken: String!, $data: ResetPasswordInput!) {
  resetPassword(resetPasswordToken: $resetPasswordToken, data: $data)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      resetPasswordToken: // value for 'resetPasswordToken'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResetPasswordRequestDocument = gql`
    mutation ResetPasswordRequest($data: ResetPasswordRequestInput!) {
  resetPasswordRequest(data: $data)
}
    `;
export type ResetPasswordRequestMutationFn = Apollo.MutationFunction<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;

/**
 * __useResetPasswordRequestMutation__
 *
 * To run a mutation, you first call `useResetPasswordRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordRequestMutation, { data, loading, error }] = useResetPasswordRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordRequestMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>(ResetPasswordRequestDocument, options);
      }
export type ResetPasswordRequestMutationHookResult = ReturnType<typeof useResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationResult = Apollo.MutationResult<ResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationOptions = Apollo.BaseMutationOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;
export const SearchMusiciansDocument = gql`
    query SearchMusicians($instrumentTypeId: String) {
  musicians(instrumentTypeId: $instrumentTypeId) {
    id
    firstName
    lastName
    email
    phoneNumber
    instrumentTypes {
      name
    }
  }
}
    `;

/**
 * __useSearchMusiciansQuery__
 *
 * To run a query within a React component, call `useSearchMusiciansQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMusiciansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMusiciansQuery({
 *   variables: {
 *      instrumentTypeId: // value for 'instrumentTypeId'
 *   },
 * });
 */
export function useSearchMusiciansQuery(baseOptions?: Apollo.QueryHookOptions<SearchMusiciansQuery, SearchMusiciansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchMusiciansQuery, SearchMusiciansQueryVariables>(SearchMusiciansDocument, options);
      }
export function useSearchMusiciansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchMusiciansQuery, SearchMusiciansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchMusiciansQuery, SearchMusiciansQueryVariables>(SearchMusiciansDocument, options);
        }
export function useSearchMusiciansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchMusiciansQuery, SearchMusiciansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchMusiciansQuery, SearchMusiciansQueryVariables>(SearchMusiciansDocument, options);
        }
export type SearchMusiciansQueryHookResult = ReturnType<typeof useSearchMusiciansQuery>;
export type SearchMusiciansLazyQueryHookResult = ReturnType<typeof useSearchMusiciansLazyQuery>;
export type SearchMusiciansSuspenseQueryHookResult = ReturnType<typeof useSearchMusiciansSuspenseQuery>;
export type SearchMusiciansQueryResult = Apollo.QueryResult<SearchMusiciansQuery, SearchMusiciansQueryVariables>;