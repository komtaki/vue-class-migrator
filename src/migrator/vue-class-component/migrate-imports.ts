import { SourceFile } from "ts-morph";

// Import handling
export default (outFile: SourceFile) => {
  const importStatementsToRemove = [
    "vue-property-decorator",
    "vue-class-component",
    "vuex-class",
    "nuxt-property-decorator",
  ];

  const nuxtAppImport = outFile.getImportDeclaration(
    (importDeclaration) =>
      importDeclaration.getModuleSpecifierValue() === "nuxt/app"
  );

  if (!nuxtAppImport) {
    outFile.addImportDeclaration({
      defaultImport: "{ defineNuxtComponent }",
      moduleSpecifier: "nuxt/app",
    });
  } else {
    nuxtAppImport.addNamedImport("defineNuxtComponent");
  }

  outFile.getImportDeclarations().forEach((importDeclaration) => {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
    if (importStatementsToRemove.includes(moduleSpecifier)) {
      importDeclaration.remove();
    }
  });
};
