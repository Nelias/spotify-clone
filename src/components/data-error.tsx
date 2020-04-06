import React from 'react'
import styled from 'styled-components'

const ErrorWrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const DataError: React.FC<{
  data: any
  title: string
  children: any
}> = ({ data, title, children }) => {
  return data.status && data.status !== 200 ? (
    <ErrorWrapper>
      <h2>
        {title} Error {data.status}
      </h2>
      <p>{data.message}</p>
    </ErrorWrapper>
  ) : (
    children
  )
}
