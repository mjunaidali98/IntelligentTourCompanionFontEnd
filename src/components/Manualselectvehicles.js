import React, { Component } from 'react';
import '../componentcss/Selecttripvehicles.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import CheckIcon from '@material-ui/icons/Check';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '40%',
        backgroundColor: "theme.palette.background.paper",
        marginTop: '3%',
        marginLeft: '31%'
    },
}));


export default function Manualselectvehicles() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div style={{ marginTop: '1%' }}>
            <div className={classes.root} >
                <AppBar position="static" >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="off"
                        aria-label="scrollable prevent tabs example"
                        style={{ backgroundColor: '#FF4500' }}
                    >
                        <Tab icon={<EmojiTransportationIcon />}  {...a11yProps(0)} />
                        <Tab icon={<DirectionsBusIcon style={{ color: 'white' }} />} {...a11yProps(1)} />
                        <Tab icon={<DirectionsCarIcon style={{ color: 'white' }} />} {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div className="overalldiv">
                        <div className="cardcontainer" >
                            <div className="card" style={{ border: 'none' }}>
                                <div className="face face1">
                                    <div className="content">
                                        <div className="icon">
                                            <img src=" https://cache2.pakwheels.com/system/car_generation_pictures/3171/original/Jeep-Wrangler-3rd-gen.jpg?1449038587 " style={{ width: '300px', height: '200px' }}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="cardcontent">
                                        <h3>
                                            Toyota Jeep
                    </h3>
                                        <ul>
                                            <li>Capacity: sadsadsdasdasad</li>
                                            <li>Rent: sadsadadsa without fuel</li>
                                            <li>Driver: sadsadadsa</li>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                style={{marginleft:'10%'}}
                                                >
                                                Select 
      </Button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ border: 'none' }}>
                                <div className="face face1">
                                    <div className="cardcontent">
                                        <div className="icon">
                                            <img src="https://cache3.pakwheels.com/system/car_generation_pictures/3098/original/Toyota-Mark-II-2000-2004.jpg?1447676125" style={{ width: '300px', height: '200px' }}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="cardcontent">
                                        <h3>
                                            <a href="https://twitter.com/AdamDipinto" target="_blank">@AdamDipinto</a>
                                        </h3>
                                        <p>This is where I read news and network with different social groups.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ border: 'none' }}>
                                <div className="face face1">
                                    <div className="cardcontent">
                                        <div className="icon">
                                            <img src="https://i.pinimg.com/474x/06/33/6f/06336f2ed39555bc00709125cbe3a19d.jpg" style={{ width: '300px', height: '200px' }}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="cardcontent">
                                        <h3>
                                            <a href="https://github.com/atom888" target="_blank">atom888</a>
                                        </h3>
                                        <p>This is where I share code and work on projects.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ border: 'none' }}>
                                <div className="face face1">
                                    <div className="cardcontent">
                                        <div className="icon">
                                            <img src="https://cache2.pakwheels.com/system/car_generation_pictures/2873/medium/Suzuki_Mehran_2012.jpg?1444111663" style={{ width: '300px', height: '200px' }}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="cardcontent">
                                        <h3>
                                            <a href="https://github.com/atom888" target="_blank">atom888</a>
                                        </h3>
                                        <p>This is where I share code and work on projects.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="overalldiv">
                        <div className="cardcontainer" >
                            <div className="card" style={{ border: 'none' }}>
                                <div className="face face1">
                                    <div className="content">
                                        <div className="icon">
                                            <img src=" https://cache2.pakwheels.com/system/car_generation_pictures/3171/original/Jeep-Wrangler-3rd-gen.jpg?1449038587 " style={{ width: '300px', height: '200px' }}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="cardcontent">
                                        <h3>
                                            Toyota Jeep
                    </h3>
                                        <ul>
                                            <li>Capacity: sadsadsdasdasad</li>
                                            <li>Rent: sadsadadsa</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ border: 'none' }}>
                                <div className="face face1">
                                    <div className="cardcontent">
                                        <div className="icon">
                                            <img src="https://cache3.pakwheels.com/system/car_generation_pictures/3098/original/Toyota-Mark-II-2000-2004.jpg?1447676125" style={{ width: '300px', height: '200px' }}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="cardcontent">
                                        <h3>
                                            <a href="https://twitter.com/AdamDipinto" target="_blank">@AdamDipinto</a>
                                        </h3>
                                        <p>This is where I read news and network with different social groups.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div className="overalldiv">
                        <div className="cardcontainer" style={{ width: '40%' }} >
                            <div className="card" style={{ border: 'none', marginLeft: '82%' }}>
                                <div className="face face1">
                                    <div className="content">
                                        <div className="icon">
                                            <img src=" https://cache2.pakwheels.com/system/car_generation_pictures/3171/original/Jeep-Wrangler-3rd-gen.jpg?1449038587 " style={{ width: '300px', height: '200px' }}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="cardcontent">
                                        <h3>
                                            Toyota Jeep
                    </h3>
                                        <ul>
                                            <li>Capacity: sadsadsdasdasad</li>
                                            <li>Rent: sadsadadsa</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </TabPanel>
            </div></div>
    )
}
