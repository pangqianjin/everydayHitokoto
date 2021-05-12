import React, { Component } from 'react'
import Pubsub from 'pubsub-js'

export default class Body extends Component {
    state = {
        isFirst: true,
        isLoading: false,
        from: '',
        hitokoto: '',
        err: ''
    }


    componentDidMount(){
        this.token = Pubsub.subscribe('addHitokotos', (_, stateObj)=>{
            this.setState(stateObj)
        })
    }

    componentWillUnmount(){
        Pubsub.unsubscribe(this.token)
    }

    render() {
        const {isFirst, isLoading, from,hitokoto, err}= this.state
        return (
            <div>
                {
                    isFirst? <h2>点击按钮获取每日一言</h2>:
                    isLoading? <h2>加载中...</h2>:
                    err!==''? <h2>{err}</h2>:
                    <div className='content'>
                        <p className='hitokoto'>{hitokoto}————来自{from}</p>
                    </div>
                }
            </div>
        )
    }
}
