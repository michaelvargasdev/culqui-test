import { loadFeature, defineFeature } from "jest-cucumber";
import { getCard } from "../../../src/card/handler";
import { CardModel } from "../../../src/db";

const feature: any = loadFeature("./getCard.feature", { loadRelativePath: true, errors: true });

defineFeature(feature, (test) => {
  test("Obtener tarjeta con filtros no validos", ({ given, when, then }) => {
    let solicitud: any;
    let event: any;
    let respuesta: any;

    given(/^se ingresa el (.*)$/, (token: string) => {
      event = { pathParameters: { token } };
      solicitud = getCard;
    });

    when("seleccionamos la opción de Obtener tarjeta", async () => {
      respuesta = await solicitud(event);
    });

    then(/^se mostrará el mensaje de validación: (.*)$/, (message: string) => {
      const body: any = JSON.parse(respuesta.body);
      expect(body.data[0]).toEqual(message);
    });
  });

  test("Obtener tarjeta con filtros validos", ({ given, when, then }) => {
    let solicitud: any;
    let event: any;
    let respuesta: any;

    given(/^se ingresa el (.*)$/, (token: string) => {
      event = { pathParameters: { token } };
      solicitud = getCard;
      /*jest.spyOn(CardModel, "findOne").mockImplementationOnce(() => {
        const card: any = new Model<Card>({
          email: "michael.c.v.m.dev@yahoo.es",
          card_number: "4111111111111111",
          expiration_year: "2025",
          expiration_month: "07",
          millis: new Date().getTime()
        });
        return card;
      });*/
      CardModel.findOne = jest.fn().mockResolvedValue({
        email: "michael.c.v.m.dev@yahoo.es",
        card_number: "4111111111111111",
        expiration_year: "2025",
        expiration_month: "07",
        millis: new Date().getTime()
      });
    });

    when("seleccionamos la opción de Obtener tarjeta", async () => {
      respuesta = await solicitud(event);
    });

    then(/^se mostrará los datos de la tarjeta: (.*), (.*), (.*) y (.*)$/,
      (email: string, card_number: string, expiration_year: string, expiration_month: string) => {
        const body: any = JSON.parse(respuesta.body);
        const card: any = body.data;
        expect(card.email).toEqual(email);
        expect(card.card_number).toEqual(card_number);
        expect(card.expiration_year).toEqual(expiration_year);
        expect(card.expiration_month).toEqual(expiration_month);
      });
  });

  test("Obtener tarjeta con token caducado", ({ given, when, then }) => {
    let solicitud: any;
    let event: any;
    let respuesta: any;

    given(/^se ingresa el (.*)$/, (token: string) => {
      event = { pathParameters: { token } };
      solicitud = getCard;
      /*jest.spyOn(CardModel, "findOne").mockImplementationOnce(() => {
        const card: any = new Model<Card>({
          email: "michael.c.v.m.dev@yahoo.es",
          card_number: "4111111111111111",
          expiration_year: "2025",
          expiration_month: "07",
          millis: new Date().getTime() - 900001
        });
        return card;
      });*/
      CardModel.findOne = jest.fn().mockResolvedValue({
        millis: new Date().getTime() - 900001
      });
    });

    when("seleccionamos la opción de Obtener tarjeta", async () => {
      respuesta = await solicitud(event);
    });

    then(/^se mostrará el mensaje de validación: (.*)$/, (message: string) => {
      const body: any = JSON.parse(respuesta.body);
      expect(body.message).toEqual(message);
    });
  });

  test("Obtener tarjeta con error", ({ given, when, then }) => {
    let solicitud: any;
    let event: any;
    let respuesta: any;

    given(/^se ingresa el (.*)$/, (token: string) => {
      event = { pathParameters: { token } };
      solicitud = getCard;
      jest.spyOn(CardModel, "findOne").mockImplementationOnce(() => { throw Error("Error expect"); });
    });

    when("seleccionamos la opción de Obtener tarjeta", async () => {
      respuesta = await solicitud(event);
    });

    then(/^se mostrará el mensaje de error: (.*)$/, (message: string) => {
      const body: any = JSON.parse(respuesta.body);
      expect(body.message).toEqual(message);
    });
  });
});
