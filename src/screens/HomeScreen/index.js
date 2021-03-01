import React from 'react';
import {HomeScreen} from '../../containers/AppScreens';
import HomeScreenServiceComponent from '../../containers/AppScreens/HomeScreen/index.service';

class Home extends React.Component {
    //created separate component for business logic and view
    render() {
        return (
            <HomeScreenServiceComponent {...this.props}>
                {props => (
                    <HomeScreen
                        {...props}
                    />
                )}
            </HomeScreenServiceComponent>
        );
    };
};

export default Home;