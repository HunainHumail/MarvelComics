import React from 'react';
import {OnboardingScreen} from '../../containers/InitialScreens';
import OnboardingServiceComponent from '../../containers/InitialScreens/OnboardingScreen/index.service';

class Onboarding extends React.Component {
    //created separate component for business logic and view
    render() {
        return (
            <OnboardingServiceComponent {...this.props}>
                {props => (
                    <OnboardingScreen
                        {...props}
                    />
                )}
            </OnboardingServiceComponent>
        );
    };
};

export default Onboarding;