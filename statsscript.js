const mongoose = require('mongoose');

// Conectar a MongoDB
const MONGO_URI = "mongodb+srv://MarvelRPG2:ReedRichards2099@cluster0.lvklcd6.mongodb.net/dbMarvel?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// Definir los modelos
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const FormSchema = new Schema({
  _id: ObjectId,
  name: String,
  attributeStack: ObjectId,  // Este es el campo que vamos a actualizar
  // Otros campos de la forma
});
const FormModel = mongoose.model('forms', FormSchema);

const AttributeStackSchema = new Schema({
  _id: ObjectId,
  formId: ObjectId,  // Este campo es el que vamos a buscar
  // Otros campos del stack
});
const AttributeStackModel = mongoose.model('attribute_stacks', AttributeStackSchema);

async function addAttributeStackToForms() {
  try {
    console.log("🔄 Iniciando la asignación de AttributeStack a las formas...");

    // Obtener todas las formas
    const forms = await FormModel.find({});
    console.log(`📄 Se encontraron ${forms.length} formas.`);

    for (const form of forms) {
      console.log(`✨ Procesando forma: ${form._id}`);

      try {
        // Buscar el AttributeStack correspondiente
        const stack = await AttributeStackModel.findOne({ formId: form._id });

        if (stack) {
          // Asignar el ID del attribute_stack a la forma
          form.attributeStack = stack._id;

          // Guardar la forma actualizada
          await form.save();
          console.log(`✅ Se ha asignado el attributeStack con ID ${stack._id} a la forma ${form._id}`);
        } else {
          console.log(`⚠️ No se encontró el attributeStack para la forma ${form._id}`);
        }
      } catch (error) {
        console.error(`❌ Error procesando la forma ${form._id}:`, error);
        continue; // Continua con la siguiente forma si ocurre un error
      }
    }

    console.log("🎉 Proceso completado con éxito.");
  } catch (error) {
    console.error("❌ Error en el proceso principal:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Ejecutar script
addAttributeStackToForms();