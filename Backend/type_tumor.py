# import numpy as np
# import tensorflow as tf
# import matplotlib.pyplot as plt
# from keras.preprocessing.image import ImageDatGenerator

# model = tf.keras.model.load_model("turor.keras")
# img_path="Backend\00059_103.jpg"
# img=tf.keras.utils.load_img(img_path, target_size=(128,128))
# img_array=tf.keras.utils.img_to_array(img)
# img_array=np.array([img_array])
# predictions=model.predict(img_array)
# predicted_class=np.argmax(predictions)
# print(predicted_class)
# classname=valid_set.class_names
# print(classname[predicted_class])

import tensorflow as tf
print(tf.__version__)
