import { Flex, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import React from 'react';

const CardGrid = (props: SimpleGridProps) => {
  const columns = React.useMemo(() => {
    const count = React.Children.toArray(props.children).filter(React.isValidElement).length
    return {
      base: Math.min(2, count),
      md: Math.min(3, count),
      lg: Math.min(4, count),
      xl: Math.min(5, count),
    }
  }, [props.children])

  return (
    <>
      {/* {columns} */}
      <SimpleGrid 
        minChildWidth='280px'
        spacing='20px'
        {...props}
      />
    </>
  )
}

export default CardGrid;