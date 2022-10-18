import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    passwordCount: 0,
    showPassword: false,
    isTrue: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const colors = colorList[Math.floor(Math.random() * 5)]

    const initials = website.slice(0, 1).toUpperCase()

    const newPassword = {
      id: uuidv4(),
      websites: website,
      usernames: username,
      passwords: password,
      showPassword: false,
      initialValue: initials,
      classAdd: colors,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      username: '',
      password: '',
      passwordCount: prevState.passwordCount + 1,
      searchInput: '',
      isTrue: true,
    }))
  }

  onClickShowPassword = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePass = id => {
    const {passwordList} = this.state

    const newList = passwordList.filter(eachValue => eachValue.id !== id)

    const caseOf = newList.length !== 0
    this.setState(prevState => ({
      passwordCount: prevState.passwordCount - 1,
      passwordList: newList,
      isTrue: caseOf,
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      passwordCount,
      passwordList,
      showPassword,
      searchInput,
    } = this.state

    let {isTrue} = this.state

    const newList = passwordList.filter(eachPass =>
      eachPass.websites.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    console.log(username)
    console.log(password)
    console.log(website)
    console.log('ShowPass', showPassword)
    console.log('kya malum', isTrue)

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="upper">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sub-image2"
          />
          <form className="form-container" onSubmit={this.onAddPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-cont">
              <label htmlFor="website">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
              </label>
              <input
                id="website"
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
                className="input-element"
              />
            </div>
            <div className="input-cont">
              <label htmlFor="username">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
              </label>
              <input
                className="input-element"
                id="username"
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="input-cont">
              <label htmlFor="password">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="logo"
                />
              </label>
              <input
                id="password"
                className="input-element"
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-image1"
            alt="password manager"
          />
        </div>

        <div className="lower">
          <div className="head-container">
            <div className="your-password">
              <h1 className="lower-head">Your Passwords </h1>
              <p className="colored-text">{passwordCount}</p>
            </div>
            <div className="search-bar">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logo"
              />
              <input
                type="search"
                onChange={this.onSearch}
                className="input-element"
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              className="check-box"
              id="check"
              type="checkbox"
              onChange={this.onClickShowPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {isTrue ? (
            <ul className="result-container">
              {newList.map(eachPass => (
                <li className="list-item" id={eachPass.id} key={eachPass.id}>
                  <p className={`initial ${eachPass.classAdd}`}>
                    {eachPass.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="output">{eachPass.websites}</p>
                    <p className="output">{eachPass.usernames}</p>
                    {showPassword ? (
                      <p className="output">{eachPass.passwords}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="starts-image"
                        alt="stars"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    testid="delete"
                    onClick={() => this.deletePass(eachPass.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
