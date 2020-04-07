import React from 'react'
import styled from 'styled-components'

export const ErrorWrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ErrorTitle = styled.h2``

export const ErrorMessage = styled.p``

export const DataError: React.FC<{
  data: any
  title: string
  children: any
}> = ({ data, title, children }) => {
  return data.status && data.status !== 200 ? (
    <ErrorWrapper>
      <ErrorTitle>
        {title} Error {data.status}
      </ErrorTitle>
      <ErrorMessage>{data.message}</ErrorMessage>
    </ErrorWrapper>
  ) : (
    children
  )
}
