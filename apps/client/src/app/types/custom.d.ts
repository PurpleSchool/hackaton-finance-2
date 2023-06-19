declare module '*.svg' {
  import React from 'react';

  const SVGReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    }
  >;

  export default SVGReactComponent;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
