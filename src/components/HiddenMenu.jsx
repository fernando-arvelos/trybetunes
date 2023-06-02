import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React, { Component } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

export default class HiddenMenu extends Component {
  constructor() {
    super();
    this.state = {
      showHeader: false,
    };
  }

  handleButtonClick = () => {
    this.setState((prevState) => ({
      showHeader: !prevState.showHeader,
    }));
  };

  render() {
    const { showHeader } = this.state;

    return (
      <Menu>
        <MenuButton
          as={ IconButton }
          aria-label="Toggle menu"
          icon={ showHeader ? <CloseIcon boxSize="18px" /> : <HamburgerIcon /> }
          variant="outline"
          bg="transparent"
          color="rgba(255, 230, 230, 0.7)"
          border="2px"
          borderColor="rgba(255, 230, 230, 0.7)"
          fontSize="30px"
          _hover={ { color: 'white', border: '2px', borderColor: 'white' } }
          _focus={ { bg: 'transparent' } }
          zIndex="2"
          onClick={ this.handleButtonClick }
        />
        <motion.div
          initial={ { x: '-100%' } }
          animate={ { x: showHeader ? '0%' : '-100%' } }
          transition={ { duration: 0.5 } }
        >
          <MenuList>
            <Header />
          </MenuList>
        </motion.div>
      </Menu>
    );
  }
}
