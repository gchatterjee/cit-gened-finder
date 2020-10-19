import React from 'react'

export default class Header extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>
          This app was built using{' '}
          <a href="https://scottylabs.org/course-api/">
            ScottyLabs&apos;s Course API
          </a>
          .
        </p>
        <p>
          Found a bug or experiencing issues? Open a Git Issue{' '}
          <a href="https://github.com/gchatterjee/cit-gened-finder/issues/new">
            on GitHub
          </a>
          .
        </p>
      </div>
    )
  }
}
