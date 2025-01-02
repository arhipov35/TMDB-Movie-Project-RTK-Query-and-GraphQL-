import React, { PropsWithChildren } from "react";
import store from "../store";
import { Provider } from "react-redux";
import { RenderOptions, render } from "@testing-library/react";

// Функція для рендеру з провайдером Redux
export function renderWithProviders(ui: React.ReactElement, renderOptions: RenderOptions = {}) {
  // Обгортка компонента для надання доступу до Redux Store
  function Wrapper({ children }: PropsWithChildren<{}>): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Рендеримо компонент із провайдером Redux
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
