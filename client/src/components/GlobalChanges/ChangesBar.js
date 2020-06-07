import React from 'react';
import clsx from 'clsx';
import './ChangesBar.css'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import GetChanges from './GetCahnges';
import AddModal from '../Modal/AddModal';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  bar:{
    maxHeight:250,
    height:200,
    width:1600,
    display:'flex'
  },
  load:{
    backgroundColor:"white",
    color:"black"
  },
  item:{
    width:150,
    height:24
  },
  fullList: {
    width: 'auto',
  },
  fullBarTop:{
    width:250
  }
});

 const ChangesBar = ()=> {

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
<GetChanges/>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'top'} >
          <Button onClick={toggleDrawer('top', true)} variant="outlined" className={classes.load} >{'טען תכניות'}</Button>
          <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)} style={{width:'360px'}} >
            {list('top')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
export default ChangesBar