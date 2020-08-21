import React, {Fragment} from 'react'
import { Spin, Result } from 'antd';

const Loading = () => {

  return (
    <Fragment>
      <Result
        icon={<Spin size="large" />}
        title="...Loading..."
        subTitle="Thank You For Your Patience"
      />
    </Fragment>
  )
}

export default Loading;