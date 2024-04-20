# Use an image with Android SDK and emulator pre-installed
#FROM mobiledevops/android-sdk-image:latest
FROM budtmo/docker-android:latest
# Install Node.js and npm
#RUN mkdir -p /var/lib/apt/lists/partial && chmod -R 755 /var/lib/apt/lists
USER root
RUN curl -sL https://deb.nodesource.com/setup_14.x
RUN apt-get upgrade
RUN apt-get install -y nodejs npm
RUN npm install -g react-native-cli
#RUN sdkmanager  --sdk_root=/opt/android-sdk/ --install "system-images;android-33;google_apis;x86_64"
#RUN yes | sdkmanager --sdk_root=/opt/android-sdk/ --licenses
RUN echo "no" | avdmanager create avd -n test -k "system-images;android-33;google_apis;x86_64" -f
# Set environment variables
ENV ANDROID_HOME /opt/android-sdk
ENV PATH $PATH:$ANDROID_HOME/tools
ENV PATH $PATH:$ANDROID_HOME/platform-tools
#/opt/android-sdk/node_modules/emulator/bin
# Clone your React Native project
#WORKDIR /app
#
#RUN cd /app
#COPY . .
#
#RUN npm i
## Install dependencies
#RUN npm install

# Expose necessary ports
EXPOSE 8081
# Start the emulator
#CMD npm start android
# Expose ports
#EXPOSE 8081 19000 19001 19002
# Start the React Native packager
CMD emulator -avd test -no-audio -no-window && npm start android
#
## Run your React Native app
#CMD react-native run-android
