import React from 'react';
import {SplashScreen} from '../../containers/InitialScreens/';
import SplashServiceComponent from '../../containers/InitialScreens/SplashScreen/index.service';

class Splash extends React.Component {
    //created separate component for business logic and view
    render() {
        return (
            <SplashServiceComponent {...this.props}>
                {props => (
                    <SplashScreen
                        {...props}
                    />
                )}
            </SplashServiceComponent>
        );
    };
};

export default Splash;