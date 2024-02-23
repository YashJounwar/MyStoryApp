import React from 'react'
import errorcss from '../assets/css/NewsErrorBoundry.module.css'

function NewsErrorBoundry({error , resetErrorBoundary}) {

    return (
        <div className={errorcss.errorBox} role="alert">
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      );
}

export default NewsErrorBoundry
