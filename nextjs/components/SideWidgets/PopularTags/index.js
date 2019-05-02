import React, { Component } from 'react'
import TagWithLink from '../../TagWithLink'
import { apiGet } from '../../../api'
import _ from 'lodash'

import classes from './index.scss'

class PopularTags extends Component {
  state = {
    tags: [],
  }

  componentDidMount() {
    this.getPopularTags()
  }

  getPopularTags = async () => {
    try {
      let res = await apiGet.getPopularTags()
      const tags = _.get(res, 'data', [])
      this.setState({ tags })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={classes.tag__container}>
        {this.state.tags.map(tag => {
          return <TagWithLink key={tag.id + tag.slug} customClass={classes.tag} text={tag.title} url="/" />
        })}
      </div>
    )
  }
}

export default PopularTags
