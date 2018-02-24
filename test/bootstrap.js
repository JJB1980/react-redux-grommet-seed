import chai from 'chai'
import sinon from 'sinon'
import dirtyChai from 'dirty-chai'
import 'jsdom-global/register'
import jsdom from 'jsdom'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import chaiEnzyme from 'chai-enzyme'

// chai.use(chaiEnzyme())
chai.use(dirtyChai)

global.expect = chai.expect
global.sinon = sinon

const { JSDOM } = jsdom
const { document } = (new JSDOM('')).window
global.document = document

global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

Enzyme.configure({ adapter: new Adapter() })

global.mount = mount
global.shallow = shallow
