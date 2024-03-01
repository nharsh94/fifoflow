//@ts-check
/**
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 *
 * @param {{info: LaunchInfo | undefined }} props
 * @returns {React.ReactNode}
 */
import logo from "./logo_sans_bckgrnd.png";

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
        <div className="App">
            <header className="App-header">
                <img src={logo} />
                <h5>
                    An open-source, automated system for managing your
                    logistical nightmares!
                </h5>
                <form id="user_login">
                    <div className="form-floating mb-3">
                        <input
                            style={{
                                color: 'black',
                                backgroundColor: 'white',
                                border: '1px solid black',
                                textDecoration: 'none',
                            }}
                            required
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Username"
                            autoComplete="off"
                        />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input
                            style={{
                                color: 'black',
                                backgroundColor: 'white',
                                border: '1px solid black',
                                textDecoration: 'none',
                            }}
                            required
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button
                        style={{
                            color: 'black',
                            backgroundColor: 'white',
                            border: '1px solid black',
                            padding: '6px 12px',
                            textDecoration: 'none',
                        }}
                        className="btn btn-outline-light btn-lg"
                        id="login-btn"
                        data-replace=""
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <div className="side-by-side-buttons">
                    <a
                        style={{
                            color: 'black',
                            backgroundColor: 'white',
                            border: '1px solid black',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            textDecoration: 'none',
                        }}
                        id="forgot-password-btn"
                        data-replace=""
                        href="#"
                    >
                        Forgot password?
                    </a>
                    <a
                        style={{
                            color: 'black',
                            backgroundColor: 'white',
                            border: '1px solid black',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            textDecoration: 'none',
                        }}
                        id="create-account-btn"
                        data-replace=""
                        href="#"
                    >
                        Create Account
                    </a>
                </div>
            </header>
        </div>
    )
}

export default Construct
