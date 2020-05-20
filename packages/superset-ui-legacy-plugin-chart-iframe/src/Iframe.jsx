/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import Mustache from 'mustache';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  url: PropTypes.string,
  width: PropTypes.number.isRequired,
  extraFilters: PropTypes.string,
  data: PropTypes.string,
};
const defaultProps = {
  className: '',
  url: '',
};

class Iframe extends React.PureComponent {

  componentDidMount(){
    if (this.areRecords) {
      document.getElementById("iframeForm").submit();
    }
  }
  
  componentDidUpdate(){
    if (this.areRecords) {
      document.getElementById("iframeForm").submit();
    }
  }

  render() {
    const { className, url, width, height, extraFilters, data } = this.props;
    let completeUrl = Mustache.render(url, {
      height,
      width,
    });
    const jsonRecords = JSON.stringify( data.records );
    const jsonExtraFilters = JSON.stringify( extraFilters );
    const areRecords = typeof jsonRecords === 'undefined' ? false : true;
    this.areRecords = areRecords;
    completeUrl = completeUrl.replace( "%HOST%", window.location.hostname);
    return (
      <div>
        <iframe
          name="iframeChart"
          className={className}
          title="superset-iframe"
          src={areRecords ? "": completeUrl}
          style={{
            height,
            width: '100%',
          }}
        />
        {areRecords && 
          <form id="iframeForm" target="iframeChart" action={completeUrl} method="post">
            <input type="hidden" name="csrf_token" value={document.getElementById("csrf_token").value} />
            <input type="hidden" name="records" value={jsonRecords} />
            <input type="hidden" name="filters" value={jsonExtraFilters} />
          </form>
        }
      </div>
    );
  }
}

Iframe.propTypes = propTypes;
Iframe.defaultProps = defaultProps;

export default Iframe;
