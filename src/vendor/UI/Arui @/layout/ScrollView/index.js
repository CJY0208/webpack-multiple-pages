import React, { Component, Fragment } from 'react'
import { findDOMNode } from 'react-dom'
import { PullToRefresh, ActivityIndicator } from 'antd-mobile'
import { helpers } from '@common'
import styles from './style.m.css'
import Holder from './RefreshHolder'

const { classNames, ScrollListener, run, value } = helpers

const className = classNames.react(styles)

const defaultDistanceToRefresh =
  document.documentElement.clientWidth * (48 * 100 / 720 + 6.25 * 2) / 100

const defaultIndicator = {
  activate: <div {...className('indicator')}>Release to refresh</div>,
  deactivate: <div {...className('indicator')}>Pull to refresh</div>,
  release: (
    <div {...className('indicator')}>
      <ActivityIndicator animating size="large" />
    </div>
  ),
  finish: <div {...className('indicator')}>Done</div>
}

const renderIndicator = indicator =>
  Object.entries(indicator).reduce(
    (res, [key, value]) =>
      Object.assign(res, {
        [key]: <Holder>{value}</Holder>
      }),
    {}
  )

@helpers.hot(module)
export default class ScrollView extends Component {
  render() {
    const children = (
      <Fragment>
        {run(this.props, 'children', this.state)}
        {value(
          run(this.props, 'renderFooter', this.state),
          this.state.useEndReacher && (
            <div {...className('footer')}>
              {this.state.finished ? (
                'Finished'
              ) : this.state.loading ? (
                <ActivityIndicator animating size="large" />
              ) : (
                'Loaded'
              )}
            </div>
          )
        )}
      </Fragment>
    )

    const commonProps = Object.assign(
      className('scrollView', this.props.className),
      {
        ref: el => (this.ptr = el)
      }
    )

    return this.state.useRefresh ? (
      <PullToRefresh
        {...commonProps}
        indicator={renderIndicator(
          Object.assign({}, defaultIndicator, this.props.indicator)
        )}
        distanceToRefresh={value(
          this.props.distanceToRefresh,
          defaultDistanceToRefresh
        )}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      >
        {children}
      </PullToRefresh>
    ) : (
      <div {...commonProps}>{children}</div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      loading: false,
      finished: false,
      useRefresh: helpers.isFunction(this.props.onRefresh),
      useEndReacher: helpers.isFunction(this.props.onEndReached),
      useScrollListener:
        helpers.isFunction(this.props.onEndReached) ||
        !helpers.isUndefined(this.props.distanceEvents)
    }
  }

  componentDidMount() {
    if (this.state.useScrollListener) {
      this.initScrollEvent()
    }
  }

  componentWillUnmount() {
    run(this, '$ScrollListener.destroy')
  }

  initScrollEvent() {
    this.$ScrollListener = new ScrollListener({
      element: findDOMNode(this.ptr),
      distanceToReachEnd: this.props.distanceToReachEnd,
      distanceEvents: this.props.distanceEvents,
      onEndReached: $c => {
        this.setState({
          loading: true
        })
        $c.endReacher.pause()
        run(this.props, 'onEndReached', (finished = false) => {
          if (finished && helpers.isUndefined(this.props.distanceEvents)) {
            $c.destroy()
          } else {
            $c.endReacher.continue()
          }
          this.setState({
            loading: false,
            finished
          })
        })
      }
    })
  }

  onRefresh = () => {
    run(this, '$ScrollListener.destroy')
    this.initScrollEvent()

    this.setState({
      refreshing: true,
      finished: false
    })

    run(this.props, 'onRefresh', () => {
      this.setState({
        refreshing: false
      })
    })
  }
}
