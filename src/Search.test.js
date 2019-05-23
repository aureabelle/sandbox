import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Search from './Search';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    snackers: [
        {
            email: "gmcwhinnie0@sfgate.com",
            fave_snack: "Hagenes and Sons",
            first_name: "Gerri",
            gender: "Male",
            id: 1,
            ip_address: "208.75.197.92",
            last_name: "McWhinnie"
        },
        {
            email: "dellerey1@ezinearticles.com",
            fave_snack: "Pollich, Mueller and Ratke",
            first_name: "Decca",
            gender: "Male",
            id: 2,
            ip_address: "70.28.165.135",
            last_name: "Ellerey"
        },
        {
            email: "ccleugh2@ezinearticles.com",
            fave_snack: "Kautzer-Feil",
            first_name: "Cicily",
            gender: "Female",
            id: 3,
            ip_address: "74.177.25.215",
            last_name: "Cleugh"
        }
    ]

};

describe('Search Component', () => {
    test('matches the snapshot', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders correctly', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper.exists()).toBe(true);
    });
});