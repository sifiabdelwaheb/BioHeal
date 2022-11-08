import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import {
    Card,
    CardBody
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

class Post extends Component {

    render() {
        return (

            <Card>
                <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
                    <div className="price-top-part">
                        
                        <p className="text-large mb-2 text-default">{this.props.data.price}</p>
                        <p className="text-muted text-small">{this.props.data.detail}</p>
                    </div>
                    <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                        <ul className="list-unstyled">
                            {
                                this.props.data.features.map((feature, index) => {
                                    return (
                                        <li key={index}>
                                            <p className="mb-0">{feature}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="text-center">
                            
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default injectIntl(Post);







