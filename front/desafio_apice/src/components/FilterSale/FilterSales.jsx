const getFilteredDate = (sale, initialDate, finalDate) =>
  sale.data >= initialDate && sale.data <= finalDate;

const getFilteredByName = (sale, people) => sale.pessoa === people;

const FilterSales = (sales, people, initialDate, finalDate, dataIsChecked, peopleIsChecked) => {
  const filteredSales = sales.filter((sale) => {
    const dateMatch = !dataIsChecked || getFilteredDate(sale, initialDate, finalDate);
    const peopleMath = !peopleIsChecked || getFilteredByName(sale, people);

    return dateMatch && peopleMath;
  });

  return filteredSales;
};

export default FilterSales;
