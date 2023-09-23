class Registry<K, V> extends Map<K, V> {
  getOrThrow(key: K): V {
    if (this.has(key)) return this.get(key)!;

    throw new Error(`Key '${key}' ios not defined in registry.`);
  }
};

export const registry = new Registry();

export const registerRender = (name: Symbol, renderFunction: ()) 