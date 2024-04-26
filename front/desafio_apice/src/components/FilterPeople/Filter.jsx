const Filter = (peoples, nameIsChecked, name, cityIsChecked, city, districtIsChecked, district) => {
  const getFilteredName = (nativeName, name) => nativeName.toLowerCase().includes(name);
  const getFilteredCity = (nativeCityName, city) => nativeCityName.toLowerCase() === city;
  const getFilteredDistrict = (nativeDistrictName, district) =>
    nativeDistrictName.toLowerCase() === district;

  const getFilteredPeoples = (
    peoples,
    nameIsChecked,
    name,
    cityIsChecked,
    city,
    districtIsChecked,
    district
  ) => {
    const filteredPeoples = peoples.filter(({ nome, cidade, bairro }) => {
      const nameMatch = !nameIsChecked || getFilteredName(nome, name);
      const cityMatch = !cityIsChecked || getFilteredCity(cidade, city);
      const districtMatch = !districtIsChecked || getFilteredDistrict(bairro, district);

      return nameMatch && cityMatch && districtMatch;
    });

    return filteredPeoples;
  };

  return getFilteredPeoples(
    peoples,
    nameIsChecked,
    name,
    cityIsChecked,
    city,
    districtIsChecked,
    district
  );
};

export default Filter;
