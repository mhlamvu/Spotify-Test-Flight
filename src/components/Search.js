import React, {useState, useRef, useContext, createContext} from 'react'

// import useStyles from './styles'



export const MetaContext = createContext()

export const Search = ( { children, ...restProps}) => {
  return (
    <>
      {children}
    </>
  )
}


Search.Result = function SearchResult({
  resultId, children, ...restProps
}) {
  const [toggleShow, setToggleShow] = useState(false)

  return (
    <MetaContext.Provider value={ {resultId, toggleShow, setToggleShow}}>
      {children}
    </MetaContext.Provider>
  )
}


Search.Body = function SearchBody({children, ...restProps}) {
  const [toggleShow, setToggleShow] = useContext(MetaContext)

  return (
    <section
      onClick={() => setToggleShow(!toggleShow)}
      {...restProps}
    >
      {children}
    </section>
  )
}


Search.Meta = function SearchMeta({children, ...restProps}) {
  const {toggleShow, resultId} = useContext(MetaContext)

  return (
    {if (toggleShow) {
      <section {...restProps}>
      {children({toggleShow, resultId})}
      </section>
    }}
  )

}


Search.Input = function SearchInput({ placeholder, ...restProps}) {
  
  const Search = useRef()

  return (
    <input
      type='text'
      ref={Search}
      placeholder={placeholder}
      {...restProps}
    />
  )
}