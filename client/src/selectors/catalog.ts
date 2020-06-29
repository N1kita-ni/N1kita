import { createSelector } from 'reselect';
import { IState, ICatalogProduct, TSortBy } from '@typings/state/index';

export const isCatalogLoaded = (state: IState) => state.catalog.isLoaded;
export const selectFilters = (state: IState) => state.filters;
export const selectSortBy = (state: IState) => state.sortBy;
export const selectProducts = (state: IState) => state.catalog.items;
export const selectProduct = (state: IState, props: any) => state.catalog.items.find((item) => item._id == props.match.params.id);

export const sortProducts = (catalog: ICatalogProduct[], sortBy: TSortBy) => {
  switch (sortBy) {
    case 'Name: A-Z':
      return catalog.sort((a, b) => (a.info.name > b.info.name) ? 1 : ((b.info.name > a.info.name) ? -1 : 0));
    case 'Name: Z-A':
      return catalog.sort((a, b) => (a.info.name < b.info.name) ? 1 : ((b.info.name < a.info.name) ? -1 : 0));
    case 'Price: Low to High':
      return catalog.sort((a, b) => (a.info.price > b.info.price) ? 1 : ((b.info.price > a.info.price) ? -1 : 0));
    case 'Price: High to Low':
      return catalog.sort((a, b) => (a.info.price < b.info.price) ? 1 : ((b.info.price < a.info.price) ? -1 : 0));
    default:
      return catalog;
  }
};

export const filterProducts = createSelector(
  [selectProducts, selectFilters],
  (catalog, { filters }) => {
    return catalog.filter((item) => {
      const priceRange = filters.priceRange.length ? filters.priceRange.includes(item.tags.priceRange) : item.tags.priceRange;
      const color = filters.color.length ? filters.color.includes(item.tags.color) : item.tags.color;

      return priceRange && color;
    })
  }
);
