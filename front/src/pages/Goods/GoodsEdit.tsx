import {observer} from 'mobx-react';
import React from 'react';

@observer
class GoodsEdit extends React.Component {

    render() {
        // @ts-ignore
        const goodsId = this.props.match.params.id;
        debugger;
        console.log(this.props);
        return <div>Goods edit</div>;
    }
}

export default GoodsEdit;
