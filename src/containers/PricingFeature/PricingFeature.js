import React from 'react'
import {
  Container,
  Grid
} from '@material-ui/core'
import useStyles from './styles'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { PricingFeatureCard } from 'components/Card'
import AosComponent from 'components/AosComponent'
import { useMediaQuery } from 'react-responsive'
import { setSubscribeOpen } from 'redux/modules/global/actions'

const featureContents = [
  {
    id: 0,
    title: 'Only Icons',
    text: 'Icon',
    subheader: 'Unlimited access to all icons.',
    ipad_subheader: 'All Icons unlimited',
    value: '$9',
    amount: '9',
    priceId: 'price_1IV1IyDVdnix3Irr5NiMXWeJ',
    // priceId: 'price_1IAu1oEVxlXovjp3K9r3pZmw', // test key
    planId: 'P-3RR69851YF066182WMBHIO6Q',
    content: [
      {
        title: 'Source file included',
        text: 'All icons can be downloaded with their own After Effects file.',
        ipad_text: 'Each icon has it own AE file'
      },
      {
        title: 'JSON file included',
        text: 'All icons can be downloaded as JSON or GIF.',
        ipad_text: 'Implement it where every you want'
      },
      {
        title: 'Lifetime use',
        text: 'You have lifetime rights for all downloaded icons.',
        ipad_text: 'You have lifetime rights to use'
      },
    ]
  },
  {
    id: 1,
    title: 'Only Illustrations',
    text: 'Illustration',
    subheader: 'Unlimited access to all illustrations.',
    ipad_subheader: 'All Illustrations unlimited',
    value: '$9',
    amount: '9',
    priceId: 'price_1IlcopDVdnix3IrrZmLwrnTw',
    planId: 'P-0PC61276K7027905YMBHIQTI',
    content: [
      {
        title: 'Source file included',
        text: 'All illustrations can be downloaded with their own After Effects file.',
        ipad_text: 'Each Illustration has its own AE file'
      },
      {
        title: 'JSON and GIF',
        text: 'All illustrations can be downloaded as JSON or GIF.',
        ipad_text: 'Implement it where every you want'
      },
      {
        title: 'Lifetime use',
        text: 'You have lifetime rights for all downloaded illustrations.',
        ipad_text: 'Use it for your Powerpoint'
      },
    ]
  },
  {
    id: 2,
    title: 'Icons & Illustrations',
    text: 'Icon and Illustration',
    subheader: 'Unlimited access to everything + SVG download',
    ipad_subheader: 'All Icons & Illustrations unlimited',
    value: '$15',
    amount: '15',
    priceId: 'price_1IV1IzDVdnix3IrrExRjWClP',
    planId: 'P-1AC91319L4909360YMBHIRFA',
    special: true,
    content: [
      {
        title: 'Package one and two',
        text: 'Everything from the packages Only Icons and Only Illustrations included.',
        ipad_text: 'Everything included'
      },
      {
        title: 'Illustrator files',
        text: 'All icons and illustrations can be downloaded as SVG.',
        ipad_text: 'SVG and Illustrator Files available'
      },
    ]
  },
]

const PricingFeature = ({ setSubscribeOpen }) => {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 600 })

  const handlePurchase = (index) => {
    setSubscribeOpen({
      open: true,
      subscribeInfo: featureContents[index]
    })
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        {
          featureContents.map((item, key) => (
            <Grid item xs={isMobile ? 12 : 4} key={key}>
              <AosComponent>
                <PricingFeatureCard info={item} onPurchase={handlePurchase} />
              </AosComponent>
            </Grid>
          ))
        }
      </Grid>

      <div className={classes.featureBottomText}>
        Prices listed in USD. Transactions are encrypted and secured. PayPal or any credit card.
      </div>

    </Container >
  )
}

PricingFeature.propTypes = {
  setSubscribeOpen: PropTypes.func,
}

const actions = {
  setSubscribeOpen,
}

export default compose(connect(null, actions))(PricingFeature)
