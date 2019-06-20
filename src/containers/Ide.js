import PropTypes from "prop-types";
import Ide from "../components/layouts/Ide.js";
import * as Actions from "../actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// This makes sure we are getting what we think we should
Ide.propTypes = {
    editor: PropTypes.object.isRequired,
    user: PropTypes.object,
    scene: PropTypes.object.isRequired,
};

// This makes the values accessible as props
const mapStateToProps = state => ({
    editor: state.editor,
    user: state.user.user,
    scene: state.scene,
    projects: state.project,
    courses: state.courses,
    classrooms: state.classrooms
});

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
    editorActions: bindActionCreators(Actions.EditorActions, dispatch),
    authActions: bindActionCreators(Actions.AuthActions, dispatch),
    sceneActions: bindActionCreators(Actions.SceneActions, dispatch),
    projectActions: bindActionCreators(Actions.ProjectActions, dispatch),
    courseActions: bindActionCreators(Actions.CourseActions, dispatch),
    classroomActions: bindActionCreators(Actions.ClassroomActions, dispatch)
});

// This does the binding to the redux store
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ide);
