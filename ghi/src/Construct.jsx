//@ts-check
/**
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 *
 * @param {{info: LaunchInfo | undefined }} props
 * @returns {React.ReactNode}
 */
import logo from './FIFOFlow_transparent_x1.png'

import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function Construct(props) {
    if (!props.info) {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Loading...</p>
                </header>
            </div>
        )
    }
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img className="logo" src={logo} alt="FIFOFlow Logo" />
                    <h5 className='motto'>
                        An open-source, automated system for managing your
                        logistical nightmares!
                    </h5>
                    <form id="user_login">
                        <div className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="User Login"
                            >
                                <Form.Control
                                    type="username"
                                    placeholder="username"
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingPassword"
                                label="Password"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                            </FloatingLabel>
                        </div>
                        <Button
                            className="btn btn-outline-light btn-lg"
                            variant="primary"
                            id="login-btn"
                            data-replace=""
                            type="submit"
                        >
                            Login
                        </Button>{' '}
                    </form>
                    <div className="side-by-side-buttons">
                        <a id="forgot-password-btn" data-replace="" href="#">
                            Forgot password?
                        </a>
                        <a id="create-account-btn" data-replace="" href="#">
                            Create Account
                        </a>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Construct
