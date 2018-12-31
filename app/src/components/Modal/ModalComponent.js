import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { displayTodoForm } from '../../actions/todoActions';
import '../../styles/css/todo-modal.scss';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '3px',
  },
};

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChange = editorState => this.setState({ editorState });
  }

  state = {
    isOpen: true,
    todoTitle: '',
    todoDescription: EditorState.createEmpty(),
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props);
    if (props.isOpen !== state.isOpen) {
      return {
        isOpen: props.isOpen,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  closeModal() {
    this.props.dispatch(displayTodoForm(false));
  }

  onEditorStateChange = editorState => {
    this.setState({
      todoDescription: editorState,
    });
  }
  handleSubmit(event) {
    console.log('go here');
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        <Modal
          isOpen={isOpen}
          style={customStyles}
          bodyOpenClassName="ReactModal__TodoForm__Content"
        >
          <button className="todo-modal-close-btn" onClick={this.closeModal}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
          <h1 id="heading">Add Todo Item</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="todo-modal-row">
              <span>Title: </span>
              <span>
                <input
                  type="text"
                  name="todoTitle"
                  onChange={this.handleInputChange}
                />
              </span>
            </div>
            <div className="todo-modal-row">
              <Editor
                editorState={this.state.todoDescription}
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isOpen: store.todoListState.isOpenModal,
});

ModalComponent.propTypes = {
  isOpen: PropTypes.bool,
  dispatch: PropTypes.func
};

export default connect(mapStateToProps)(ModalComponent);
