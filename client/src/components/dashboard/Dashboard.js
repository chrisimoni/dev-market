import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile ===null || loading) {
      dashboardContent = <Spinner />
    }else {
      // Check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: Display profile</h4>
      }else {
        // Logged in user has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name } </p>
            <p className="lead text-left">You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info"> Creat Profile </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
         <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">
                {dashboardContent}
              </h1>
            </div>
          </div>
         </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
