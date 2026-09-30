import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { selectIngredient } from '@store/ingredient-details-slice';
import { selectIngredientCounts, selectIngredients } from '@store/selectors';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IngredientSection } from '@components/ingredient-section/ingredient-section';
import { getIngredientsByType, INGREDIENT_TYPES } from '@utils/ingredient-types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const ingredientCounts = useSelector(selectIngredientCounts);
  const [activeTab, setActiveTab] = useState(INGREDIENT_TYPES.BUN);
  const ingredientsContainerRef = useRef(null);
  const bunSectionRef = useRef(null);
  const sauceSectionRef = useRef(null);
  const mainSectionRef = useRef(null);
  const buns = useMemo(
    () => getIngredientsByType(ingredients, INGREDIENT_TYPES.BUN),
    [ingredients]
  );
  const sauces = useMemo(
    () => getIngredientsByType(ingredients, INGREDIENT_TYPES.SAUCE),
    [ingredients]
  );
  const mains = useMemo(
    () => getIngredientsByType(ingredients, INGREDIENT_TYPES.MAIN),
    [ingredients]
  );
  const sectionRefs = useMemo(
    () => ({
      [INGREDIENT_TYPES.BUN]: bunSectionRef,
      [INGREDIENT_TYPES.SAUCE]: sauceSectionRef,
      [INGREDIENT_TYPES.MAIN]: mainSectionRef,
    }),
    []
  );

  const handleTabClick = useCallback(
    (tab) => {
      setActiveTab(tab);
      sectionRefs[tab].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    [sectionRefs]
  );

  const updateActiveTab = useCallback(() => {
    const container = ingredientsContainerRef.current;

    if (!container) {
      return;
    }

    const containerTop = container.getBoundingClientRect().top;
    const closestSection = Object.entries(sectionRefs).reduce(
      (closest, [type, ref]) => {
        const distance = Math.abs(
          ref.current.getBoundingClientRect().top - containerTop
        );

        return distance < closest.distance ? { distance, type } : closest;
      },
      { distance: Number.POSITIVE_INFINITY, type: INGREDIENT_TYPES.BUN }
    );

    setActiveTab(closestSection.type);
  }, [sectionRefs]);

  useEffect(() => {
    updateActiveTab();
  }, [updateActiveTab]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value={INGREDIENT_TYPES.BUN}
            active={activeTab === INGREDIENT_TYPES.BUN}
            onClick={() => handleTabClick(INGREDIENT_TYPES.BUN)}
          >
            Булки
          </Tab>
          <Tab
            value={INGREDIENT_TYPES.SAUCE}
            active={activeTab === INGREDIENT_TYPES.SAUCE}
            onClick={() => handleTabClick(INGREDIENT_TYPES.SAUCE)}
          >
            Соусы
          </Tab>
          <Tab
            value={INGREDIENT_TYPES.MAIN}
            active={activeTab === INGREDIENT_TYPES.MAIN}
            onClick={() => handleTabClick(INGREDIENT_TYPES.MAIN)}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      <div
        ref={ingredientsContainerRef}
        className={`${styles.ingredients_container} custom-scroll`}
        onScroll={updateActiveTab}
      >
        <IngredientSection
          title="Булки"
          ingredientCounts={ingredientCounts}
          ingredients={buns}
          onIngredientClick={(ingredient) => dispatch(selectIngredient(ingredient))}
          sectionRef={sectionRefs[INGREDIENT_TYPES.BUN]}
        />
        <IngredientSection
          title="Соусы"
          ingredientCounts={ingredientCounts}
          ingredients={sauces}
          onIngredientClick={(ingredient) => dispatch(selectIngredient(ingredient))}
          sectionRef={sectionRefs[INGREDIENT_TYPES.SAUCE]}
        />
        <IngredientSection
          title="Начинки"
          ingredientCounts={ingredientCounts}
          ingredients={mains}
          onIngredientClick={(ingredient) => dispatch(selectIngredient(ingredient))}
          sectionRef={sectionRefs[INGREDIENT_TYPES.MAIN]}
        />
      </div>
    </section>
  );
};
