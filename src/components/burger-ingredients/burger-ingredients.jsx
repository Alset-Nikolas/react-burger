import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo, useRef, useState } from 'react';

import { IngredientSection } from '@components/ingredient-section/ingredient-section';
import { getIngredientsByType, INGREDIENT_TYPES } from '@utils/ingredient-types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  bun,
  constructorFillings,
  ingredients,
  onIngredientClick,
}) => {
  const [activeTab, setActiveTab] = useState(INGREDIENT_TYPES.BUN);
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
  const ingredientCounts = useMemo(() => {
    const counts = {};

    if (bun) {
      counts[bun._id] = 2;
    }

    constructorFillings.forEach((item) => {
      counts[item._id] = (counts[item._id] || 0) + 1;
    });

    return counts;
  }, [bun, constructorFillings]);

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
      <div className={`${styles.ingredients_container} custom-scroll`}>
        <IngredientSection
          title="Булки"
          ingredientCounts={ingredientCounts}
          ingredients={buns}
          onIngredientClick={onIngredientClick}
          sectionRef={sectionRefs[INGREDIENT_TYPES.BUN]}
        />
        <IngredientSection
          title="Соусы"
          ingredientCounts={ingredientCounts}
          ingredients={sauces}
          onIngredientClick={onIngredientClick}
          sectionRef={sectionRefs[INGREDIENT_TYPES.SAUCE]}
        />
        <IngredientSection
          title="Начинки"
          ingredientCounts={ingredientCounts}
          ingredients={mains}
          onIngredientClick={onIngredientClick}
          sectionRef={sectionRefs[INGREDIENT_TYPES.MAIN]}
        />
      </div>
    </section>
  );
};
