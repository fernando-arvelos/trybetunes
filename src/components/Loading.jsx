import { Component } from 'react';
import '../css/Loading.css';
import { Box, Text } from '@chakra-ui/react';
import { arrayOf, string } from 'prop-types';

class Loading extends Component {
  render() {
    const { color, size } = this.props;

    return (
      <Box>
        <Text color={ color } fontSize={ size }>carregando...</Text>
      </Box>
    );
  }
}

export default Loading;

Loading.propTypes = {
  color: string.isRequired,
  size: arrayOf(Number).isRequired,
};
