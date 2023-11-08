import {Component} from 'react'
import Loader from 'react-loader-spinner'

class TravelGuide extends Component {
  state = {
    isLoading: true,
    packages: [],
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://apis.ccbp.in/tg/packages')
      if (response.ok) {
        const data = await response.json()
        const {packages} = data
        this.setState({packages, isLoading: false})
      } else {
        throw new Error('Failed to fetch packages')
      }
    } catch (error) {
      console.log(error)
      this.setState({isLoading: false})
    }
  }

  render() {
    const {isLoading, packages} = this.state

    return (
      <div>
        <h1>Travel Guide</h1>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul>
            {packages.map(pack => (
              <li key={pack.id}>
                <img src={pack.image_url} alt={pack.name} />
                <h2>{pack.name}</h2>
                <p>{pack.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default TravelGuide
