import React from 'react';
import {ChangeCharacterScreen} from '../../containers/AppScreens';
import ChangeCharacterServiceComponent from '../../containers/AppScreens/ChangeCharacterScreen/index.service';

class ChangeCharacter extends React.Component {
    //created separate component for business logic and view
    render() {
        return (
            <ChangeCharacterServiceComponent {...this.props}>
                {props => (
                    <ChangeCharacterScreen
                        {...props}
                    />
                )}
            </ChangeCharacterServiceComponent>
        );
    };
};

export default ChangeCharacter;