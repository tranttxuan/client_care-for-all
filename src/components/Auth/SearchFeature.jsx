import React, { Component } from 'react'
import OtherServices from '../Profile/components/OtherServices';
import Services from '../Profile/components/Services';

export default class SearchFeature extends Component {
      state = {
            list: [],
            searchProvider: false,
            search:''
      }
      componentDidMount() {
            this.setState({
                  searchProvider: this.props.searchProvider,
                  list: this.props.list
            })
            if (this.props.searchProvider) {

            }
      }
      handleServices = (name, checked)=>{
            console.log(name, checked)
      }
      render() {
            
            return (
                  <div>
            <Services handleSearch={this.onChange}/>
            <OtherServices handleServices={this.handleServices}/>
                      
                  </div>
            )
      }
}
