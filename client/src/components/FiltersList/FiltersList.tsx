import * as React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import { IFilters } from '@typings/state/index';
import '@styles/FiltersList.css';

interface Props {
  filters: IFilters;
  setFilter: (name: string, value: string) => void;
}

class FiltersList extends React.Component<Props> {
  handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    const { setFilter } = this.props;

    setFilter(e.currentTarget.name, e.currentTarget.value);
  };

  render() {
    const { filters: { checked } } = this.props;

    return (
      <div className="filtersList">
        <List>
          <Subheader>Search by:</Subheader>
          <ListItem
            className="listItem"
            primaryText="Price"
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={[
              <Checkbox className="checkbox" label="< $5" name="priceRange" value="<5" checked={checked.includes('<5')} onCheck={this.handleCheck} />,
              <Checkbox className="checkbox" label="$5 - $10" name="priceRange" value="5-10" checked={checked.includes('5-10')} onCheck={this.handleCheck} />,
              <Checkbox className="checkbox" label="$10 >" name="priceRange" value="10>" checked={checked.includes('10>')} onCheck={this.handleCheck} />,
            ]}
          />
          <ListItem
            className="listItem"
            primaryText="Color"
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={[
              <Checkbox className="checkbox" label="Black" name="color" value="black" checked={checked.includes('black')} onCheck={this.handleCheck} />,
              <Checkbox className="checkbox" label="White" name="color" value="white" checked={checked.includes('white')} onCheck={this.handleCheck} />,
              <Checkbox className="checkbox" label="Red" name="color" value="red" checked={checked.includes('red')} onCheck={this.handleCheck} />
            ]}
          />
 
        </List>
      </div>
    )
  }
};

export default FiltersList;
