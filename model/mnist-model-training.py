# Importing Libraries
from keras.datasets import mnist
import matplotlib.pyplot as plt
from keras.utils import to_categorical
from keras import Sequential
from keras.layers import Dense

# Loading data
(X_train, y_train), (X_test, y_test) = mnist.load_data()
print("X_train.shape: {}".format(X_train.shape))
print("y_train.shape: {}".format(y_train.shape))
print("X_test.shape: {}".format(X_test.shape))
print("y_test.shape: {}".format(y_test.shape))

# Visualizing Data
plt.subplot(161)
plt.imshow(X_train[3], cmap=plt.get_cmap("gray"))
plt.subplot(162)
plt.imshow(X_train[5], cmap=plt.get_cmap("gray"))
plt.subplot(163)
plt.imshow(X_train[7], cmap=plt.get_cmap("gray"))
plt.subplot(164)
plt.imshow(X_train[2], cmap=plt.get_cmap("gray"))
plt.subplot(165)
plt.imshow(X_train[0], cmap=plt.get_cmap("gray"))
plt.subplot(166)
plt.imshow(X_train[13], cmap=plt.get_cmap("gray"))

plt.show()

print(X_train[0])

# Normalize Inputs from 0–255 to 0–1
X_train = X_train / 255
X_test = X_test / 255
# One-Hot Encode outputs
y_train = to_categorical(y_train)
y_test = to_categorical(y_test)
num_classes = 10

# Training model
x_train_simple = X_train.reshape(60000, 28 * 28).astype("float32")
x_test_simple = X_test.reshape(10000, 28 * 28).astype("float32")
model = Sequential()

model.add(Dense(28 * 28, input_dim=28 * 28, activation="relu"))
# layers: 2500, 2000, 1500, 1000, 500, 10
# model.add(Dense(2500, input_dim=28 * 28, activation="relu"))
# model.add(Dense(2000, input_dim=2500, activation="relu"))
# model.add(Dense(1500, input_dim=2000, activation="relu"))
# model.add(Dense(1000, input_dim=1500, activation="relu"))
# model.add(Dense(500, input_dim=1000, activation="relu"))
model.add(Dense(num_classes, activation="softmax"))
model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])
model.fit(x_train_simple, y_train, validation_data=(x_test_simple, y_test))

model.save("model.h5")
