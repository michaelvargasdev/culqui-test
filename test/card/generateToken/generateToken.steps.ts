import { loadFeature, defineFeature } from "jest-cucumber";
import { generateToken } from "../../../src/card/handler";
import { CardModel } from "../../../src/db";

const feature: any = loadFeature("./generateToken.feature", { loadRelativePath: true, errors: true });

defineFeature(feature, (test) => {
  test("Generar token con filtros no validos", ({ given, when, then }) => {
    let solicitud: any;
    let event: any;
    let respuesta: any;

    given(/^se ingresan los datos de tarjeta (.*), (.*), (.*), (.*) y (.*)$/,
      (email, card_number, cvv, expiration_year, expiration_month) => {
        const body: string = JSON.stringify({
          email, card_number, cvv: Number(cvv), expiration_year, expiration_month
        });
        event = { body };
        solicitud = generateToken;
      });

    when("seleccionamos la opción de Generar token", async () => {
      respuesta = await solicitud(event);
    });

    then(/^se mostrará el mensaje de validación: (.*)$/, (message: string) => {
      const body: any = JSON.parse(respuesta.body);
      expect(body.data[0]).toEqual(message);
    });
  });

  test("Generar token con filtros validos", ({ given, when, then }) => {
    let solicitud: any;
    let event: any;
    let respuesta: any;

    given(/^se ingresan los datos de tarjeta (.*), (.*), (.*), (.*) y (.*)$/,
      (email, card_number, cvv, expiration_year, expiration_month) => {
        const body: string = JSON.stringify({
          email, card_number, cvv: Number(cvv), expiration_year, expiration_month
        });
        event = { body };
        solicitud = generateToken;
        jest.spyOn(Array.prototype, "join").mockImplementationOnce(() => "ebJKGhb1RbIvwgZf");
        jest.spyOn(CardModel, "create").mockImplementationOnce(() => ({}));
      });

    when("seleccionamos la opción de Generar token", async () => {
      respuesta = await solicitud(event);
    });

    then(/^se mostrará el token generado: (.*)$/, (token: string) => {
      const body: any = JSON.parse(respuesta.body);
      expect(body.data.token).toEqual(token);
    });
  });

  test("Generar token con error", ({ given, when, then }) => {
    let solicitud: any;
    let event: any;
    let respuesta: any;

    given(/^se ingresan los datos de tarjeta (.*), (.*), (.*), (.*) y (.*)$/,
      (email, card_number, cvv, expiration_year, expiration_month) => {
        const body: string = JSON.stringify({
          email, card_number, cvv: Number(cvv), expiration_year, expiration_month
        });
        event = { body };
        solicitud = generateToken;
        jest.spyOn(Array.prototype, "join").mockImplementationOnce(() => "");
      });

    when("seleccionamos la opción de Generar token", async () => {
      respuesta = await solicitud(event);
    });

    then(/^se mostrará el mensaje de error: (.*)$/, (message: string) => {
      const body: any = JSON.parse(respuesta.body);
      expect(body.message).toEqual(message);
    });
  });
});
